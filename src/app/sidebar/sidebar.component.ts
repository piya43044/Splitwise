import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnChanges {
  @Input() sideNavStatus: Boolean = false;
  @Input() currentUrl: string = '';

  /**
   * Constructor
   *  */ 
  constructor(){};

  /**
   * ngOnChanges method
   *  */ 
  ngOnChanges(){

    // Check friend list url
    let checkFriendUrl = this.currentUrl.includes('/friends/friends-list');
    if(checkFriendUrl){
      this.currentUrl = '/friends/friends-list';
    }

    // Check group list url
    let checkGroupUrl = this.currentUrl.includes('/group/group-list');
    if(checkGroupUrl){
      this.currentUrl = '/group/group-list';
    }
  }

}
