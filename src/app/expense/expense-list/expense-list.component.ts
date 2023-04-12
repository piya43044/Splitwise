import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {

  expenseList = [
    { expenseName:'Books' , paidBy:'Priya', lentOrBorrow:'lent'},
    { expenseName:'Food' , paidBy:'Mayank', lentOrBorrow:'borrow'},
    { expenseName:'Notes' , paidBy:'Nikita', lentOrBorrow:'borrow'},
    { expenseName:'Taxi' , paidBy:'Harish', lentOrBorrow:'lent'},
  ]
}
