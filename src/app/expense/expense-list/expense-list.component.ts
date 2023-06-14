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
  unsettledDetail!: ExpenseItem[];

  /**
   * Constructor
   *  */ 
  constructor( private router: Router,
    private groupService: GroupService,
    private expenseService: ExpenseService){};

  /** 
   * ngOnInt method
   * */ 
  ngOnInit(): void{
    this.getUnsettleList();
    this.getExpenseList();
  }

  /**
   * Navigate to edit form
   * @param id of expense as string
   * */
  navigateToEditForm(id: string): void{
    this.router.navigate(['expense','expense-edit',id]);
  }

  /** 
   * Delete expense
   * @param id of expense as string
   * */ 
  deleteExpense(id: string){
    this.expenseService.deleteExpense(id).subscribe( data =>{
      this.getExpenseList();
      alert("Delete expense successfully")
    });
  }

  /**
   * Get expense list from the api
   */
  getExpenseList(): void{

    this.expenseService.getExpenseList().subscribe(async data => {
      this.expense=data;
      this.expenseItem = this.expense.items;
      for(let i=0;i<this.expenseItem.length;i++){
        // Get the group name by their id
        this.groupService.getGroupDetailByGroupId(this.expenseItem[i].groupId).subscribe( data => {
          this.expenseItem[i].groupName= data.name         
         })

        //  Compare the expense id and store the unsettled data
         for(let j=0;j<this.unsettledDetail.length;j++){
          if(this.unsettledDetail[j].expenseId === this.expenseItem[i].id){
            this.expenseItem[i].amount = this.unsettledDetail[j].amount;
            this.expenseItem[i].paymentId = this.unsettledDetail[j].paymentId;
            this.expenseItem[i].ownedBy = this.unsettledDetail[j].ownedBy;
            this.expenseItem[i].expenseId = this.unsettledDetail[j].expenseId;
          }
         }
      }
    })
  }

  /**
   * Set the value of delete expense name and id
   * @param expenseName - string, expenseId -string
   */
  setDeleteExpense(expenseName: string, expenseId: string): void{
    this.deleteExpenseName = expenseName;
    this.deleteExpenseId = expenseId;
  }

  /** 
   * Get unsettle data from the expense unsettle list api
   * */ 
  getUnsettleList(){
    
    this.expenseService.getExpenseUnsettleList().subscribe( data => {
      this.unsettledDetail = data;    
    })
  }
}
