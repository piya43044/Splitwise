import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupList, GroupMembers, GroupMembersResult } from 'src/app/models/groups';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groupList: GroupList[] = [];
  groupMembers: GroupMembersResult[] = [];
  currentUserName: string = '';

  isGroupDetailActive: Boolean = false;
  getActivatedRouteParam: String = '';
  groupNameDetail!: String;
  groups = [
    { groupName: 'Mathura', shareLink: 'dff-dfs-sdf', groupType: 'trip', groupMember: [{ memberName: 'Priya' }, { memberName: 'Nikita' }] },
    { groupName: 'Vanaras', shareLink: 'wff-dfs-sdf', groupType: 'home', groupMember: [{ memberName: 'Mayank' }, { memberName: 'Harish' }] },
    { groupName: 'Goa', shareLink: 'dff-qfs-sdf', groupType: 'trip', groupMember: [{ memberName: 'Priya' }, { memberName: 'Mayank' }, { memberName: 'Harish' }, { memberName: 'Nikita' }] },
    { groupName: 'Mumbai', shareLink: 'tff-dfs-sdf', groupType: 'home', groupMember: [{ memberName: 'Priya' }, { memberName: 'Mayank' }, { memberName: 'Harish' }] }
  ];

  transactionList = [
    { payer: 'Priya', receiver: 'Mayank', currency: 'USD', amount: 1000 },
    { payer: 'Harish', receiver: 'Mayank', currency: 'USD', amount: 2000 },
    { payer: 'Nikita', receiver: 'Priya', currency: '₹', amount: 3000 }
  ];

  expenseList = [
    { expenseName: 'Book', paidBy: 'Mayank', lent: 'Harish', paidAmount: '5000', lentAmount: '1666', currency: '₹' },
    { expenseName: 'Food', paidBy: 'Priya', lent: 'Nikita', paidAmount: '500', lentAmount: '166', currency: '₹' },
    { expenseName: 'Taxi', paidBy: 'Harish', lent: 'Nikita', paidAmount: '1000', lentAmount: '666', currency: 'USD' }
  ]



  // Constructor
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService
  ) {
    this.getGroupList();
  };

  // ngOnInit method
  ngOnInit(): void {

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) => {
      this.getActivatedRouteParam = param['routerParam'];
      if (this.getActivatedRouteParam === undefined) {
        this.isGroupDetailActive = false;
      }
      else {
        this.isGroupDetailActive = true;
        this.groupNameDetail = this.getActivatedRouteParam;
      }
    })
  }

  /** Group details show function use index and group name from group list
   * and redirect to group details page.
   * @param name
   * @param index
   **/
  groupDetailShow(name: string, index: number): void {
    this.getActivatedRouteParam = name;
    this.router.navigate(['group', 'group-list', { groupName: name, index: index }]);
  }

  /** navgate to edit form function use index from group list
   *  and redirect to edit form with index of group to edit details
   * @param index
   **/
  navigateToEditForm(index: number): void {
    this.router.navigate(['group', 'group-edit', index]);
  }

  /**  Delete group function
   * to delete group from list
   * @param index
   **/
  deleteGroup(index: number): void {
    this.groupList.splice(index, 1); // delete row from table
    const id = this.groupList[index].id;
    this.groupsService.deleteGroupFromlist(id).subscribe(res => { alert('group deleted...') });
    this.router.navigate(['group', 'group-list']);
  }

  /** Group list function to call get api
   * and get group details from server
   **/
  getGroupList(): void {
    this.groupsService.getGroupList().subscribe((res) => { this.groupList = res.items })
  }

  /** Group list function to call get api
   * and get group details from server
   * @returns GroupMembers[]
   **/
  getGroupMembers(): void {
    this.groupsService.getGroupMembers().subscribe((res) => { this.groupMembers = res });
  }

  /** CurrentUser function to call get api
   * and get name of current user from server
   **/
  getCurrentUserDetails(): void {
    this.groupsService.getCurrentUserDetails().subscribe(data => { this.currentUserName = data.userName });
  }
}

