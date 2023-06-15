import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Friend } from 'src/app/models/friend.model';
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
  deleteFriendId!: string;
  deleteFriendName!: string;
  friends!: Friend[];
  friendList:Friend[] =[];

  FriendDetailList = [
    { groupName:'Mathura', payer:'Priya', receiver:'Mayank',currency:'USD', amount:1000},
    { groupName:'Vanaras', payer:'Harish', receiver:'Mayank',currency:'USD', amount:2000},
    { groupName:'Goa', payer:'Nikita', receiver:'Priya',currency:'₹' , amount:3000}
  ];


  /**
   * Constructor
   *  */ 
  constructor( private router: Router, 
    private activatedRoute: ActivatedRoute,
    private friendService: FriendService,
    private userService: UserService){};

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
    })

    this.getFriendList();

  }

  /** 
   * Friend detail show
   * @param name - string, index - number
   * */
  friendDetailShow(name: string, index: number): void{
    this.getActivatedRouteParam = name;
    this.router.navigate(['friends','friends-list',name]);
  }

  /** 
   *  Navigate to edit form
   * @param index - number
   * */
  navigateToEditForm(index: number): void{
    this.router.navigate(['friends','friends-edit',index]);
  }

  /**
   * Set the friend id in the deleteFriendId for delete the friend
   * @param name and id of friend for delete
   */
  setDeleteFriendId(name:string, id: string): void{
    this.deleteFriendId = id; 
    this.deleteFriendName = name;
  }

  /**
   *  Delete friend by id
   * @param id of friend as string
   * */
  deleteFriend(id: string): void {
    this.friendService.deleteFriend(id).subscribe( response => {
      alert("Delete successfully");
      this.getFriendList();
    })
  }

  /**
   * Get friend list from the api
   */
  getFriendList(): void{
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
            alert("Error caught, please try again!");
          })
        }
      }

    },
    (error) => {
      alert("Error caught, please try again!");
    })
  }
}
