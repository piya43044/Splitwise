import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, filter, throwError } from 'rxjs';
import { GroupMembersToAdd, Groups } from 'src/app/models/groups';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-add-edit',
  templateUrl: './group-add-edit.component.html',
  styleUrls: ['./group-add-edit.component.scss']
})
export class GroupAddEditComponent implements OnInit {

  addGroupForm !: FormGroup;
  addMembersForm !: FormGroup;
  currentUser : string='';
  groupTypeArray: string[] = ['Trip', 'Couple', 'Other'];
  isGroupAddActive: Boolean = false;
  getActivatedRouteParam: String = '';
  isGroupCreated: boolean = false;

  // Constructor
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService) {

    /*******************************testing code*************************************/

    // this.groupsService.logoutUser().subscribe((res)=> console.log(res))
    // setTimeout(() => {
    //   this.getLogin();
    // }, 1000);

    // setTimeout(() => {
    //   this.getCurrentUser()
    // }, 2000);

  };






  // ngOnInit method
  ngOnInit(): void {
    /** Form group for add group page
     */
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
    ]),})


    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) => {
      this.getActivatedRouteParam = param['routerParam'];
      // console.log(this.getActivatedRouteParam)
      if (this.getActivatedRouteParam === undefined) {
        this.isGroupAddActive = true;
      }
      else {
        this.isGroupAddActive = false;
      }
    })


  }

  // Add member name and member email formgroup in add group form
  addMembersToGroupForm(): FormGroup {
    return new FormGroup({
      memberName: new FormControl(''),
      memberEmail: new FormControl('')
    })
  }

  // Getter methods
  get groupName() {
    return this.addGroupForm.get('groupName') as FormControl;
  }

  get about() {
    return this.addGroupForm.get('about') as FormControl;
  }

  // getter of dyanamic create group member
  get groupMembers() {
    return this.addMembersForm.get('groupMembers') as FormArray;
  }

  // Add member dynamically
  addMemberNameAndEmailField(): void {
    this.groupMembers.push(this.addMembersToGroupForm());
  }

  // Delete member name and email
  deleteMemberNameAndEmailField(i: number): void {
    this.groupMembers.removeAt(i);
  }

  // Submit method
  onSubmit(): void {
    // this.addGroupForm.reset();
    // this.router.navigate(['group/group-list']);
  }

  /** create group method to get data from add group form
   * and send to post api call function
   */
  createGroup() {
   // this.currentUser = this.getCurrentUser();
   //const currentUserDetails = this.getCurrentUserByName(this.currentUser);
  //  const currentUserId = currentUserDetails.id
     const data : Groups = {
      name: this.groupName?.value as string,
      about: this.about?.value as string,
      groupMembers: [
        {
          userId: "3a0ba79a-0f40-0dd1-4e91-9ed501777180"
        }
      ]
    }

    this.groupsService.createGroup(data).subscribe(() => {
      console.log('Group created successfully!');
    });
    this.isGroupCreated = true;
  }

  /** add Members method to get data from add add members form
   * and send to post api call function
   */
  addMembersToGroup() {
    const data : GroupMembersToAdd = this.groupMembers.value;
    console.log(data)
    this.groupsService.addMembersToGroup(data).subscribe(() => {
      console.log('members added successfully!');
    });
  }


  /** current user method to get name of current user from server through api */
  getCurrentUser() {
    return this.groupsService.getCurrentUser().subscribe((val) => console.log(val))
  }

  /** current user by name method to get user details of current user from server through api */
  getCurrentUserByName(name : string) {
    return this.groupsService.getCurrentUserDetails().subscribe((val) => console.log(val))
  }

  // ////////////////////////////////code for testing purpose ////////////////////////////////

  getLogin() {
    return this.groupsService.getLogin().subscribe((val) => console.log(val))
  }

  registerUser() {
    return this.groupsService.resgisterUser().subscribe((val) => console.log(val))
  }

}
