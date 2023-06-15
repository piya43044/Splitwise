import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GroupMembersToAdd, GroupResult, Groups, UserProfile } from 'src/app/models/groups';
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
  getActivatedRouteParam: String = '';
  isGroupCreated: boolean = false;

  GroupResult !: GroupResult;
  userProfile!: UserProfile;

  // Constructor
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService
  ) { }

  // ngOnInit method
  ngOnInit(): void {
    //Form group for add group page
    this.addGroupForm = new FormGroup({
      groupName: new FormControl('', [Validators.required]),
      about: new FormControl(''),
      groupMember: new FormArray([
        new FormGroup({
          userId: new FormControl('3a0ba79a-0f40-0dd1-4e91-9ed501777180')
        })
      ]),
    })

    // form group add members to group
    this.addMembersForm = new FormGroup({
      groupMembers: new FormArray([
        this.addMembersToGroupForm()
      ]),
    })

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) => {
      this.getActivatedRouteParam = param['routerParam'];
      if (this.getActivatedRouteParam === undefined) {
        this.isGroupAddActive = true;
      }
      else {
        this.isGroupAddActive = false;
      }
    })


  }// OnInit method end

  /** Add member name and member email formgroup in add group form
   * @returns GroupMembers formgroup with memberName and memberEmail controls
   **/
  addMembersToGroupForm(): FormGroup {
    return new FormGroup({
      memberName: new FormControl(''),
      memberEmail: new FormControl('')
    })
  }

  // Getter methods
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
  get groupMembers(): FormArray {
    return this.addMembersForm.get('groupMembers') as FormArray;
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
  createGroup(): void {
    const data: Groups = {
      name: this.groupName?.value as string,
      about: this.about?.value as string,
      groupMembers: [{
        userId: "3a0ba79a-0f40-0dd1-4e91-9ed501777180"
      }]
    }

    // Create group Api call from group service
    this.groupsService.createGroup(data).subscribe(
      (data) => {
      this.GroupResult = data;
      alert('Group created successfully!');
    });
    this.isGroupCreated = true;
  }

  /** add Members method
   * to get data from add add members form
   * and send to post api call function
   **/
  addMembersToGroup(): void {
    const data: GroupMembersToAdd = this.groupMembers.value;

    // AddMembers api call from group service
    this.groupsService.addMembersToGroup(data).subscribe(
      (res) => { alert('members added successfully!') },
      (error) => { alert (error) }
    );
  }


  /** current user method
   * to get name of current user
   * from server through api
   * @returns string returns current user's name
   * */
  getCurrentUser(): void {
    let currentUSerName: string = '';

    // Current user api call to get current user's name
    this.groupsService.getCurrentUser().subscribe(
      (val) => { currentUSerName = val },
      (error) => { alert (error) }
      );
  }

  /** current user by name method
   * to get user details of current user
   * from server through api
   **/
  getCurrentUserByName(name: string): void {
    this.groupsService.getCurrentUserDetails().subscribe(
      (val) => { this.userProfile = val },
      (error) => { alert (error) }
      );
  }
}
