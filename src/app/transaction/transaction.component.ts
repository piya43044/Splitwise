import { Component } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { TransactionList } from '../models/transactionList.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  transactionList: TransactionList[] = [];
  /**
   * constructor
   */
  constructor(private transactionService: TransactionService) {
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
        this.transactionList = data;
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
