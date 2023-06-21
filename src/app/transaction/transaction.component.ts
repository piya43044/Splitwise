import { Component } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { TransactionList } from '../models/transactionList.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ExpenseService } from '../services/expense.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  transactionList: TransactionList[] = [];
  transaction: TransactionList[] = [];

  /**
   * constructor
   */
  constructor(private transactionService: TransactionService,
    private expenseService: ExpenseService,
    private toastrService: ToastrService,
    private userService: UserService) {
  }

  /**
  * ngOnInit method
  */
  ngOnInit(): void {
    this.paymentlist();
  }

  /**
   * Paymentlist are used to get settled payment list or transaction list
   */
  paymentlist() {
    this.transactionService.getPaymentList().subscribe(
      (data: TransactionList[]) => {
        this.transaction = data;

        for(let i=0; i< this.transaction.length; i++){
          if(this.transaction[i].isSettled){
            
            /**
             * Get expense detail by their id and set the values in the form
             */
            this.expenseService.getExpenseDetailById(this.transaction[i].expenseId).subscribe(data =>{
              const expenseDetail = data;
              this.transaction[i].expenseName = expenseDetail.expense_title;
            })
            
            
            // Get the user detail by their user id
            this.userService.getUserDetail(this.transaction[i].ownedBy).subscribe( data => {
              this.transaction[i].ownedByName = data.userName;
            })

            // Get the user detail by their user id
            this.userService.getUserDetail(this.transaction[i].lastModifierId).subscribe( data => {
              this.transaction[i].creatorName = data.userName;
            })

            this.transactionList.push(this.transaction[i]);
          }
        }
      },
      // @param error store the httpErrorResponse
      (error: HttpErrorResponse) => {
        if (error.status === 404) {
          alert('Not Found');
        } else if (error.status === 403) {
          alert('Forbidden');
        } else if (error.status === 500) {
          alert('Server Error');
        }
      }
    );
  }
}
