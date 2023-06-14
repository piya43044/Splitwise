import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friends-add-edit',
  templateUrl: './friends-add-edit.component.html',
  styleUrls: ['./friends-add-edit.component.scss']
})
export class FriendsAddEditComponent implements OnInit {

  addFriendForm !: FormGroup;
  isFriendAddActive: Boolean = false;
  getActivatedRouteParam : String = '';
  loading: boolean = false;

  // Constructor
  constructor( private router: Router, 
    private activatedRoute: ActivatedRoute,
    private friendService: FriendService){};

  // ngOnInit method
  ngOnInit(): void {

    // Add friend form
    this.addFriendForm = new FormGroup({
      friendName: new FormControl('', [Validators.required]),
      friendEmail: new FormControl('', [Validators.required]),
    })

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.getActivatedRouteParam = param['routerParam'];

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
   *  */ 
  get friendEmail(){
    return this.addFriendForm.get('friendEmail');
  }

  get friendName(){
    return this.addFriendForm.get('friendName');
  }

  // Submit method for invite friend
  onSubmit(): void{
    this.loading = true;
    this.friendService.postFriend(this.addFriendForm.value).subscribe( response => {
      this.loading = false;
      alert(response.result);
      this.addFriendForm.reset();
      this.router.navigate(['friends/friends-list']);
    })
  }
}
