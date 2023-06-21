import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FriendList, GroupMembersToAdd, GroupResult, Groups, UserProfile } from 'src/app/models/groups';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-add-edit',
  templateUrl: './group-add-edit.component.html',
  styleUrls: ['./group-add-edit.component.scss']
})
export class GroupAddEditComponent implements OnInit {

  addGroupForm !: FormGroup;
  addMembersForm !: FormGroup;

  isGroupAddActive: Boolean = false;
  getActivatedRouteParam !: string;
  getSelectedGroupIndex !: number;

  isGroupCreated: boolean = false;

  groupId: string = '';
  friendList: FriendList[] = []

  GroupResult !: GroupResult;
  userProfile!: UserProfile;


  // Constructor
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {
    // FriendList function call to get users list
    this.getUserList();
  }


  // ngOnInit method
  ngOnInit(): void {
    /** Form group for add group page */
    this.addGroupForm = this.formBuilder.group({
      groupName: new FormControl('', [Validators.required]),
      about: new FormControl(''),
      groupMember: this.buildGroupMembers()
    });


    /** form group add members to group */
    this.addMembersForm = new FormGroup({
      groupMembers: new FormArray([
        this.addMembersToGroupForm()
      ]),
    })

    /** get activatedRoute parameter using observable */
    this.activatedRoute.params.subscribe((param) => {
      this.getActivatedRouteParam = param['routerParam'];
      this.getSelectedGroupIndex = Number(param['routerParam']);


      if (this.getActivatedRouteParam === undefined) {
        this.isGroupAddActive = true;
      }
      else {
        this.isGroupAddActive = false;
      }
    })

    /** On click of group edit button it will set current details of group to textbox */
    if (this.getActivatedRouteParam != undefined) {
      const data = this.getEditDataToEdit(this.getSelectedGroupIndex);

      this.addGroupForm.patchValue({
        groupName: data.name,
        about: data.about,
        groupMember: [
          {
            userId: data.createdBy
          }
        ]
      })
    }

    this.friendList = this.groupsService.friendList;

  }// OnInit method end

  buildGroupMembers(): FormArray {
    const groupMembers = this.friendList.map(() => this.formBuilder.group({
      userId: '3a0ba7bc-382f-a3b4-2637-2522d5882429'
    }));
    return this.formBuilder.array(groupMembers);
  }

  /** Add member name and member email formgroup in add group form
   * @returns FormGroup
   **/
  addMembersToGroupForm(): FormGroup {
    return new FormGroup({
      groupId: new FormControl(this.groupId),
      memberName: new FormControl(''),
      memberEmail: new FormControl('')
    })
  }

  /** Get groupName FormControl
   *  @returns FormControl returns groupName
   **/
  get groupName(): FormControl {
    return this.addGroupForm.get('groupName') as FormControl;
  }

  /** Get groupDescription FormControl
   *  @returns FormControl returns about
   **/
  get about(): FormControl {
    return this.addGroupForm.get('about') as FormControl;
  }

  /** Get groupMember FromArray
   *  @returns FromArray returns groupMembers
   **/
  get groupMember(): FormArray {
    return this.addGroupForm.get('groupMember') as FormArray;
  }
  /** Get groupMember FromArray
   *  @returns FromArray returns groupMembers
   **/
  get groupMembers(): FormArray {
    return this.addMembersForm.get('groupMembers') as FormArray;
  }

  onMemberSelectionChange(event: any, member: string) {
    const selectedMembers = this.addGroupForm.get('groupMember') as FormArray;

    if (event.target.checked) {
      const newMember = this.formBuilder.group({
        userId: member
      });
      selectedMembers.push(newMember);
    } else {
      const index = selectedMembers.controls.findIndex(control => control.value.userId === member);
      if (index >= 0) {
        selectedMembers.removeAt(index);
      }
    }
  }



  /** Add member field in form
   *  on click of add menber button
   **/
  addMemberNameAndEmailField(): void {
    this.groupMembers.push(this.addMembersToGroupForm());
  }

  /** Delete member field in form
   *  on click of Delete button
   *  @param index index of field which is selected to delete
   **/
  deleteMemberNameAndEmailField(i: number): void {
    this.groupMembers.removeAt(i);
  }

  /** create group method to get data from add group form
   * and send to post api call function
   **/
  createGroup() {
    const data: Groups = {
      name: this.groupName?.value as string,
      about: this.about?.value as string,
      groupMembers: this.groupMember?.value
    }

    /**  Create group Api call from group service */
    this.groupsService.createGroup(data).subscribe(
      (res) => {
        this.groupId = res.id;
        this.toastrService.success('Group created successfully!', 'Success', {
          timeOut: 2000,
        });
        this.isGroupCreated = true;
      },
      (error) => {
        this.toastrService.error(error.error.error.message, 'Error', {
          timeOut: 2000,
        });
      }

    );
  }

  /** add Members method
   * to get data from add add members form
   * and send to post api call function
   **/
  addMembersToGroup() {
    const data: GroupMembersToAdd = this.groupMembers.value;

    /** AddMembers api call from group service */
    this.groupsService.addMembersToGroup(data).subscribe(() => {
      this.toastrService.success('Members added successfully!', 'Success', {
        timeOut: 2000,
      });
    },
      (error) => {
        this.toastrService.error('Error in addng member to group' + error.error.error.message, 'Error', {
          timeOut: 2000,
        });
      });
  }

  /** current user by name method
   * to get user details of current user
   * from server through api
   * @param name
   * @return object
   * */
  getCurrentUserByName(name: string): object {
    return this.groupsService.getCurrentUserDetails().subscribe((val) => { return (val); })
  }

  /** getEditDataToEdit method
   * to get group details to edit
   * from group service file
   * @param name
   * @return object
   * */
  getEditDataToEdit(index: number) {
    return this.groupsService.groupList[index]
  }

  /** getUserList method
   * to get user's list
   * from server
   **/
  getUserList() {
    this.groupsService.getUserList().subscribe(
      (res) => {
        this.groupsService.friendList = res;
      },
      (error) => {
        this.toastrService.error(error.error.error.message, 'Error', {
          timeOut: 2000,
        });
      })
  }




}




