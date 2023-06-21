import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Friend } from 'src/app/models/friend.model';
import { UserOutstandingDetail } from 'src/app/models/userOutstandingDetail.model';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {

  
  isFriendDetailActive: Boolean = false;
  getActivatedRouteParam : string = '';
  friendNameDetail!: String;
  friendId!: string;
  friendName!: string;
  friends: Friend[] = [];
  friendList:Friend[] = [];
  friendOweToList: UserOutstandingDetail[] = [];
  friendOweFromList: UserOutstandingDetail[] = [];
  friendOweList: UserOutstandingDetail[] = this.userService.userOutstandingList;
  noDataMessage: boolean = false;
  noOweMessage: boolean = this.userService.noOweMessage;

  /**
   * Constructor
   *  */ 
  constructor( private router: Router, 
    private activatedRoute: ActivatedRoute,
    private friendService: FriendService,
    private userService: UserService,
    private toastrService: ToastrService){};

  /**
   * ngOnInit method
   */
  ngOnInit(): void {
    
    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.getActivatedRouteParam = param['routerParam'];
      
      if(this.getActivatedRouteParam === undefined ){
        this.isFriendDetailActive = false;
      }
      else{
        this.isFriendDetailActive = true;
        this.friendNameDetail = this.getActivatedRouteParam;
      }
    },
    (error) =>{
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })

    this.getFriendList();
    this.getUserOweDetail();
  }

  /** 
   * Friend detail show
   * @param friend name as string, friend id as string
   * */
  friendDetailShow(name: string, id: string): void{
    this.getActivatedRouteParam = name;

    // Store the owe from detail for the particular friend
    for(let i=0;i<this.friendOweFromList.length;i++){
      if(this.friendOweFromList[i].owesFromYou === id){
        this.friendOweList.push(this.friendOweFromList[i]);
      }
    }

    // Store the owe to detail for the particular friend
    for(let i=0;i<this.friendOweToList.length;i++){
      if(this.friendOweToList[i].whomeToGive === id){
        this.friendOweList.push(this.friendOweToList[i]);
      }
    }

    this.userService.userOutstandingList = this.friendOweList;

    if(this.userService.userOutstandingList.length === 0){
      this.userService.noOweMessage = true;
    }
    else {
      this.userService.noOweMessage = false;
    }

    this.router.navigate(['friends','friends-list',name]);
  }

  /**
   * Set the friend id in the deleteFriendId for delete the friend
   * @param name and id of friend for delete
   */
  setDeleteFriendId(name:string, id: string): void{
    this.friendId = id; 
    this.friendName = name;
  }

  /**
   *  Delete friend by id
   * @param id of friend as string
   * */
  deleteFriend(id: string): void {
    this.friendService.deleteFriend(id).subscribe( response => {
      this.toastrService.success('Delete Successfully', '', {
        timeOut: 2000,
      });
      window.location.reload();
    },
    (error) =>{
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })
  }

  /**
   * Get friend list from the api
   */
  getFriendList(): void{
    this.userService.userOutstandingList=[];
    this.friendService.getFriendList().subscribe( data => {
      this.friends = data;

      for(let i=0;i<this.friends.length;i++){

        // Check the friend if they are deleted or not
        if(!this.friends[i].isDeleted){
          
          this.friendList.push(this.friends[i]);

          // Get the user detail by their user id
          this.userService.getUserDetail(this.friends[i].friendId).subscribe( data => {
            if(this.friends[i].friendId === data.id){
              this.friends[i].friendName = data.userName;
              this.friends[i].friendEmail = data.email;
            }
          },
          (error) =>{
            this.toastrService.error('Error caught, please try again!', '', {
              timeOut: 2000,
            });
          })
        }
      }

      if(this.friendList.length === 0){
        this.noDataMessage = true;
      }
      else {
        this.noDataMessage = false;
      }
    },
    (error) => {
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })
  }

  /**
   * Get user owe details from the api
   */
  getUserOweDetail(): void{

    // Get owe to details
    this.userService.getUserOweToDetail().subscribe( (data) => {
      this.friendOweToList = data;
    },
    (error) => {
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })

    // Get owe from details
    this.userService.getUserOweFromDetail().subscribe( data => {
      this.friendOweFromList = data;
    },
    (error) => {
      this.toastrService.error('Error caught, please try again!', '', {
        timeOut: 2000,
      });
    })
  }
}
