import { Component } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {

  transactionList = [
    { payer:'Priya', receiver:'Mayank',currency:'USD', amount:1000, paymentType: 'Paypal'},
    { payer:'Harish', receiver:'Mayank',currency:'USD', amount:2000, paymentType: 'Paypal'},
    { payer:'Nikita', receiver:'Priya',currency:'₹' , amount:3000, paymentType: 'Cash'}
  ];
  
}
