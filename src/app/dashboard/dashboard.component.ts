import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit{
  
  totalOwe: number = 0;
  totalOwed: number = 0;
  totalBalance: number = 0;
  totalBalanceSign: string = '';
  balanceDetail = [
    { owe:'owe', person:'Mayank', currency:'₹', amount: 933},
    { owe:'owed', person:'Harish', currency:'₹', amount:666 },
    { owe:'owed', person:'Nikita', currency:'₹', amount: 800 }
  ]


  // ngOnInit method
  ngOnInit(): void{
    this.totalBalanceCalculate();
  }

  // Calculate total balance, owe amount and owed amount
  totalBalanceCalculate(): void{
    this.balanceDetail.forEach(element => {
      if(element.owe === 'owe'){
        this.totalOwe = this.totalOwe + element.amount;
      }
      else{
        this.totalOwed = this.totalOwed + element.amount;
      }
    });

    this.totalBalance = this.totalOwed-this.totalOwe

    // Check total balance sign
    if(this.totalOwed > this.totalOwe){
      this.totalBalanceSign = '+';
    }
    else if(this.totalOwed < this.totalOwe){
      this.totalBalanceSign = '-';
    }
    else{
      this.totalBalanceSign = '';
    }
  }
}
