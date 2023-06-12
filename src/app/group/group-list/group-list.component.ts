import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupList } from 'src/app/models/groups';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  groupList : GroupList[] =[];

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
    private groupsService: GroupsService) {
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

  // Group detail show
  groupDetailShow(name: string, index: number): void {
    this.getActivatedRouteParam = name;
    this.router.navigate(['group', 'group-list', name]);
  }

  // Navigate to edit form
  navigateToEditForm(index: number): void {
    this.router.navigate(['group', 'group-edit', index]);
  }

  // Delete group
  deleteGroup(index: number): void {
    //this.groupList.splice(index, 1);
    const id =this.groupList[index].id;
    console.log(id)
    this.groupsService.deleteGroupFromlist(id).subscribe(res => {
      console.warn(res)
      console.log('group deleted...')
    });
  }



  getGroupList() {
    this.groupsService.getGroupList().subscribe((res) => {
      this.groupList = res.items
      this.getGroupMembers();
    })
  }

  getGroupMembers() {
    this.groupsService.getGroupMembers().subscribe((res) => {
      console.log(res);

    })
  }

  getCurrentUserDetails(){
    this.groupsService.getCurrentUserDetails().subscribe(data => {
      console.log(data.userName)
    })
  }
}

