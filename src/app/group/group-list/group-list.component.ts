import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpenseItem } from 'src/app/models/expenseItem.model';
import { GroupItem } from 'src/app/models/groupItem.model';
import { GroupList, GroupMembers, GroupMembersResult } from 'src/app/models/groups';
import { ExpenseService } from 'src/app/services/expense.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groupList: GroupList[] = [];
  groupMembers: GroupMembersResult[] = [];
  groupDetails !: GroupItem;
  currentUserName: string = '';

  isGroupDetailActive: Boolean = false;
  getActivatedRouteParam: String = '';
  groupNameDetail!: String;
  totalExpenses: ExpenseItem[] = [];
  deleteGroupId !: number;
  deleteGroupName !: string;

  // Constructor
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupsService: GroupsService,
    private expenseService: ExpenseService
  ) {
    this.getGroupList();
  };

  // ngOnInit method
  ngOnInit(): void {

    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) => {
      this.getActivatedRouteParam = param['groupName'];
      if (this.getActivatedRouteParam === undefined) {
        this.isGroupDetailActive = false;
      }
      else {
        this.isGroupDetailActive = true;
        this.groupNameDetail = this.getActivatedRouteParam;
      }
    })
    // function call to get total expense
    this.getExpensesOfGroup();
  }

  /** Group details show function use index and group name from group list
   * and redirect to group details page.
   * @param name name of the group
   * @param index index of the group from grouplist
   **/
  groupDetailShow(name: string, index: number): void {
    this.getActivatedRouteParam = name;
    this.router.navigate(['group', 'group-list', { groupName: name, index: index }]);
  }

  /** navgate to edit form function use index from group list
   *  and redirect to edit form with index of group to edit details
   * @param index index of group from group list
   **/
  navigateToEditForm(index: number): void {
    this.router.navigate(['group', 'group-edit', index]);
  }

  /**
   * Set the value of delete expense name and id
   * @param expenseName - string, expenseId -string
   * @returns void
   */
  setDeleteGroup(groupName: string, groupId: number): void{
    this.deleteGroupName = groupName;
    this.deleteGroupId = groupId;
  }

  /**  Delete group function
   * to delete group from list
   * @param index index of group from list to delete the selected group
   **/
  deleteGroup(index: number): void {
    this.groupList.splice(index, 1); // delete row from table
    const id = this.groupList[index].id;
    this.groupsService.deleteGroupFromlist(id).subscribe(res => { });
    this.router.navigate(['group', 'group-list']);
  }

  /** Group list function to call get api
   * and get group details from server
   **/
  getGroupList(): void {
    this.groupsService.getGroupList().subscribe(
      (res) => { this.groupList = res.items },
      (error) => { alert(error) }
    );
  }

  /** Group list function to call get api
   * and get group members details from server
   * @returns GroupMembers list of group members
   **/
  getGroupMembers(): void {
    this.groupsService.getGroupMembers().subscribe(
      (res) => { this.groupMembers = res },
      (error) => { alert(error) }
    );
  }

  /** getExpensesOfGroup function to call get api
   * and get group expenses details from server
   * @returns Group espenses details
   **/
  getExpensesOfGroup(): void {
    this.expenseService.getExpenseList().subscribe(
      (res) => {
        this.totalExpenses = res.items
        for (let i = 0; i < this.totalExpenses.length; i++) {
          this.groupsService.getGroupDetailByGroupId(this.totalExpenses[i].groupId).subscribe(data => {
            this.totalExpenses[i].groupName = data.name;
          })
        }
      },
      (error) => { alert(error) }
    );
  }

  /** CurrentUser function to call get api
   * and get name of current user from server
   **/
  getCurrentUserDetails(): void {
    this.groupsService.getCurrentUserDetails().subscribe(
      (res) => { this.currentUserName = res.userName },
      (error) => { alert(error) }
    );
  }
}

