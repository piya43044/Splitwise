import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Profile, BorrowedAmountDetails, DebtAmountDetails } from '../models/profile';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  userProfile !: Profile;
  borrowedAmountList: BorrowedAmountDetails[] = [];
  debtAmountList: DebtAmountDetails[] = [];

  userName !: string;

  totalOwe: number = 0;
  totalOwed: number = 0;
  totalBalance: number = 0;

  // constructor
  constructor(
    private dashboardService: DashboardService
  ) { }

  /** ngOnInit method
   **/
  ngOnInit(): void {
    //function call
    this.getCurrentUserDetails();
    this.getBorrowedAmountList();
    this.getDebtAmountList();
    setTimeout(() => {
      this.totalBalance = this.totalOwed - this.totalOwe;
    }, 100);


  }

  /** CurrentUser function to call get api
   * and get name of current user from server
   **/
  getCurrentUserDetails(): void {
    this.dashboardService.getCurrentUserDetails().subscribe(data => {
      this.dashboardService.userProfile = data;
      this.userProfile = this.dashboardService.userProfile;
      this.userName = this.dashboardService.userProfile.userName;
    })
  }

  /** getBorrowedAmountList function to get the total borrowed amount list
   * of the user and calculate total borrowed amount.
   **/
  getBorrowedAmountList(): void {
    let sum: number = 0
    this.dashboardService.getBorrowedAmountList().subscribe(data => {
      this.borrowedAmountList = data;
      for (let item of data) {
        sum += item.amount
      }
      this.totalOwe = sum;
    })
  }

  /** getBorrowedAmount function to calculate the total borrowed amount
   * of the user.
   **/
  getDebtAmountList(): void {
    let sum: number = 0
    this.dashboardService.getDebtAmountList().subscribe(data => {
      this.debtAmountList = data;
      for (let item of data) {
        sum += item.amount
      }
      this.totalOwed = sum;
    })

  }

}
