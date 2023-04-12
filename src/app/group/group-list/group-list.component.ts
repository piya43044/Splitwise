import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  isGroupDetailActive: Boolean = false;
  getActivatedRouteParam : String = '';
  groupNameDetail!: string;
  groups = [
    { groupName: 'Mathura'},
    { groupName: 'Vanaras'},
    { groupName: 'Goa'},
    { groupName: 'Mumbai'}
  ];

  transactionList = [
    { payer:'Priya', receiver:'Mayank',currency:'USD', amount:1000},
    { payer:'Harish', receiver:'Mayank',currency:'USD', amount:2000},
    { payer:'Nikita', receiver:'Priya',currency:'₹' , amount:3000}
  ];


  // Constructor
  constructor( private router: Router, private activatedRoute: ActivatedRoute){};

  // ngOnInit method
  ngOnInit(): void {
    
    // get activatedRoute parameter using observable
    this.activatedRoute.params.subscribe((param) =>{
      this.getActivatedRouteParam = param['routerParamId'];
    })
  }

  // Group detail show
  groupDetailShow(name: string, index: number): void{
    this.isGroupDetailActive = true;
    this.groupNameDetail = name;
    this.router.navigate(['group','group-list',index]);
  }

  // Navigate to edit form
  navigateToEditForm(index: number): void{
    this.router.navigate(['group','group-edit',index]);
  }

  // Delete group
  deleteGroup(index: number): void {
    this.groups.splice(index,1);
  }
}
