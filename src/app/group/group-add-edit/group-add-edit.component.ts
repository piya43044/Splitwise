import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-group-add-edit',
  templateUrl: './group-add-edit.component.html',
  styleUrls: ['./group-add-edit.component.scss']
})
export class GroupAddEditComponent implements OnInit {

  addGroupForm !: FormGroup;
  groupTypeArray: string[] = ['Trip', 'Couple', 'Other'];
  isGroupAddActive: Boolean = false;
  getActivatedRouteParam : String = '';

  // Constructor
  constructor( private router: Router, private activatedRoute: ActivatedRoute){};

  // ngOnInit method
  ngOnInit(): void {
    this.addGroupForm = new FormGroup({
      groupName: new FormControl('', [Validators.required]),
      shareLink: new FormControl(''),
      groupType: new FormControl('Home'),
      groupMember: new FormArray([
        this.memberNameAndEmailForm()
      ]),
    })

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.getActivatedRouteParam = param['routerParam'];
      console.log(this.getActivatedRouteParam)
      if(this.getActivatedRouteParam === undefined ){
        this.isGroupAddActive = true;
      }
      else{
        this.isGroupAddActive = false;
      }
    })
  }
 
  /** 
   * Add member name and member email formgroup in add group form
   * @returns FormGroup  
   * */ 
  memberNameAndEmailForm(): FormGroup{
    return new FormGroup({
      memberName : new FormControl(''),
      memberEmail : new FormControl('')
    })
  }

  /** 
   * Getter method for group name
   * @returns FormControl  
   * */ 
  get groupName(){
    return this.addGroupForm.get('groupName');
  }

  /** 
   * Getter of dyanamic create group member
   * @returns FormArray  
   * */ 
  get memberNameEmail(){
    return this.addGroupForm.get('groupMember') as FormArray;
  }

  /** 
   * Add member dynamically
   * @returns void
   * */ 
  addMemberNameAndEmail(): void{
    this.memberNameEmail.push(this.memberNameAndEmailForm());
  }

  /** 
   * Delete member name and email
   * @params i - number
   * @returns void
   * */ 
  deleteMemberNameAndEmail(i : number): void{
    this.memberNameEmail.removeAt(i);
  }

  /** 
   * Submit method
   * @returns void
   * */ 
  onSubmit(): void{
    this.addGroupForm.reset();
    this.router.navigate(['group/group-list']);
  }
}
