import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-add-edit',
  templateUrl: './group-add-edit.component.html',
  styleUrls: ['./group-add-edit.component.scss']
})
export class GroupAddEditComponent implements OnInit {

  addGroupForm !: FormGroup;
  groupTypeArray: string[] = ['Trip', 'Couple', 'Other'];

  // Constructor
  constructor( private router: Router){};

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
  }

  // Add member name and member email Formgroup in add group form
  memberNameAndEmailForm(): FormGroup{
    return new FormGroup({
      memberName : new FormControl(''),
      memberEmail : new FormControl('')
    })
  }

  // Getter methods
  get groupName(){
    return this.addGroupForm.get('groupName');
  }

  // getter of dyanamic create group member
  get memberNameEmail(){
    return this.addGroupForm.get('groupMember') as FormArray;
  }

  // Add Skill Dynamically
  addMemberNameAndEmail(): void{
    this.memberNameEmail.push(this.memberNameAndEmailForm());
  }

  // Delete Skills and Experiene
  deleteMemberNameAndEmail(i : number): void{
    this.memberNameEmail.removeAt(i);
  }

  // Submit method
  onSubmit(): void{
    console.log(this.addGroupForm);
    this.addGroupForm.reset();
    this.router.navigate(['group']);
  }
}
