import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseItem } from 'src/app/models/expenseItem.model';
import { ExpenseService } from 'src/app/services/expense.service';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent implements OnInit {

  expense!: Expense;
  expenseItem!: ExpenseItem[];
  deleteExpenseName!: string;
  deleteExpenseId!: string;
  
  // Constructor
  constructor( private router: Router,
    private groupService: GroupService,
    private expenseService: ExpenseService){};

  /** 
   * ngOnInt method
   * @return void
   * */ 
  ngOnInit(): void{
    this.getExpenseList();
  }

  /**
   * Navigate to edit form
   * @param index - number
   * @return void
   * */
  navigateToEditForm(index: number): void{
    this.router.navigate(['expense','expense-edit',index]);
  }

  /** 
   * Delete expense
   * @param index -number
   * @return void
   * */ 
  deleteExpense(id: string){
    this.expenseService.deleteExpense(id).subscribe( data =>{
      this.getExpenseList();
      alert("Delete expense successfully")
    });
  }

  /**
   * Get expense list from the api
   * @return void
   */
  getExpenseList(): void{

    this.expenseService.getExpenseList().subscribe(data => {
      this.expense=data;
      this.expenseItem = this.expense.items;
    })
  }

  /**
   * Set the value of delete expense name and id
   * @param expenseName - string, expenseId -string
   * @returns void
   */
  setDeleteExpense(expenseName: string, expenseId: string): void{
    this.deleteExpenseName = expenseName;
    this.deleteExpenseId = expenseId;
  }

}
