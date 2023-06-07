import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends-add-edit',
  templateUrl: './friends-add-edit.component.html',
  styleUrls: ['./friends-add-edit.component.scss']
})
export class FriendsAddEditComponent implements OnInit {

  addFriendForm !: FormGroup;
  isFriendAddActive: Boolean = false;
  getActivatedRouteParam : String = '';

  // Constructor
  constructor( private router: Router, private activatedRoute: ActivatedRoute){};

  /** 
   * ngOnInit method
   * @returns void
   * */ 
  ngOnInit(): void {
    this.addFriendForm = new FormGroup({
      friendName: new FormControl('', [Validators.required]),
      friendEmail: new FormControl('', [Validators.required]),
      friendMessage: new FormControl(''),
    })

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.getActivatedRouteParam = param['routerParam'];
      console.log(this.getActivatedRouteParam)
      if(this.getActivatedRouteParam === undefined ){
        this.isFriendAddActive = false;
      }
      else{
        this.isFriendAddActive = true;
      }
    })
  }

  /** 
   * Getter methods
   * @returns FormControl
   * */ 
  get friendEmail(){
    return this.addFriendForm.get('friendEmail');
  }

  get friendName(){
    return this.addFriendForm.get('friendName');
  }

  /**
   * Submit method
   * @returns void
   */
  onSubmit(): void{
    this.addFriendForm.reset();
    this.router.navigate(['friends/friends-list']);
  }
}
