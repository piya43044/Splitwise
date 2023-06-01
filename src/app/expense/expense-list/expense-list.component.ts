import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {

  expenseList = [
    { expenseName:'Books', groupName:'Mathura' , paidBy:'Priya', lentOrBorrow:'lent'},
    { expenseName:'Food', groupName:'Mathura' , paidBy:'Mayank', lentOrBorrow:'borrow'},
    { expenseName:'Notes', groupName:'Vanaras' , paidBy:'Nikita', lentOrBorrow:'borrow'},
    { expenseName:'Taxi', groupName:'Goa' , paidBy:'Harish', lentOrBorrow:'lent'},
  ]

  // Constructor
  constructor( private router: Router){};

  // Navigate to edit form
  navigateToEditForm(index: number): void{
    this.router.navigate(['expense','expense-edit',index]);
  }

  // Delete expense
  deleteExpense(index: number): void {
    this.expenseList.splice(index,1);
  }
}
