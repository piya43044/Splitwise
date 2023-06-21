import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FriendService } from 'src/app/services/friend.service';

@Component({
  selector: 'app-friends-add-edit',
  templateUrl: './friends-add-edit.component.html',
  styleUrls: ['./friends-add-edit.component.scss']
})
export class FriendsAddEditComponent implements OnInit {

  addFriendForm !: FormGroup;
  isFriendAddActive: Boolean = false;
  getActivatedRouteParam : string = '';
  loading: boolean = false;
  toaster: boolean = false;
  response: string ="";

  /**
   * Constructor
   *  */ 
  constructor( private router: Router, 
    private activatedRoute: ActivatedRoute,
    private friendService: FriendService,
    private toastrService: ToastrService){};

  /**
   * ngOnInit method
   *  */ 
  ngOnInit(): void {

    // Add friend form
    this.addFriendForm = new FormGroup({
      friendName: new FormControl('', [Validators.required]),
      friendEmail: new FormControl('', [Validators.required,
                                        Validators.pattern("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$")])
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
  get friendEmail(): FormControl{
    return this.addFriendForm.get('friendEmail') as FormControl;
  }

  get friendName(): FormControl{
    return this.addFriendForm.get('friendName') as FormControl;
  }

  /**
   * Submit method for invite friend
   *  */ 
  onSubmit(): void{
    this.loading = true;
    this.friendService.postFriend(this.addFriendForm.value).subscribe( (response) => {
      this.loading = false;
      this.toastrService.success(response.result, '', {
        timeOut: 2000,
      });
      this.addFriendForm.reset();
      this.router.navigate(['friends/friends-list']);
    },
    (error) => {
      this.loading = false;
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })
  }
}
