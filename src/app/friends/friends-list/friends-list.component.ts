import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent {

  
  isFriendDetailActive: Boolean = false;
  getActivatedRouteParam : String = '';
  friendNameDetail!: String;
  friends = [
    { friendName: 'Harish'},
    { friendName: 'Nikita'},
    { friendName: 'Priya'},
    { friendName: 'Mayank'}
  ];

  FriendDetailList = [
    { groupName:'Mathura', payer:'Priya', receiver:'Mayank',currency:'USD', amount:1000},
    { groupName:'Vanaras', payer:'Harish', receiver:'Mayank',currency:'USD', amount:2000},
    { groupName:'Goa', payer:'Nikita', receiver:'Priya',currency:'₹' , amount:3000}
  ];


  // Constructor
  constructor( private router: Router, private activatedRoute: ActivatedRoute){};

  // ngOnInit method
  ngOnInit(): void {
    
    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.getActivatedRouteParam = param['routerParam'];
      console.log(this.getActivatedRouteParam)
      if(this.getActivatedRouteParam === undefined ){
        this.isFriendDetailActive = false;
      }
      else{
        this.isFriendDetailActive = true;
        this.friendNameDetail = this.getActivatedRouteParam;
      }
    })
  }

  // friend detail show
  friendDetailShow(name: string, index: number): void{
    this.getActivatedRouteParam = name;
    this.router.navigate(['friends','friends-list',name]);
  }

  // Navigate to edit form
  navigateToEditForm(index: number): void{
    this.router.navigate(['friends','friends-edit',index]);
  }

  // Delete friend
  deletefriend(index: number): void {
    this.friends.splice(index,1);
  }
}
