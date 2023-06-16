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
      this.totalOwe = this.calculateAmount(this.borrowedAmountList);
      this.totalOwed = this.calculateAmount(this.debtAmountList);
      this.totalBalance = this.totalOwed - this.totalOwe;
    }, 1000);


  }

  /** CurrentUser function to call get api
   * and get name of current user from server
   **/
  getCurrentUserDetails(): void {
    this.dashboardService.getCurrentUserDetails().subscribe(data => {
      this.dashboardService.userProfile = data;
      this.userProfile = this.dashboardService.userProfile;
      this.userName = this.dashboardService.userProfile.userName;
    },
      (error) => { alert('Error in getting Profile details of user : ' + error.error.error.message); })

  }

  /** getBorrowedAmountList function to get the total borrowed amount list
   * of the user and calculate total borrowed amount.
   **/
  getBorrowedAmountList(): void {
    let sum: number = 0
    this.dashboardService.getBorrowedAmountList().subscribe(data => {

      //  To get user name by user id and calculate amount
      for (let item of data) {
        this.dashboardService.getUserNameById(item.whomeToGive).subscribe((res) => {
          if (res.userName != '' || null || undefined) {
            item.friendName = res.userName;
            this.borrowedAmountList.push(item);

          }
        },
          (error) => { console.log('No Borrowed amount of ' + this.userName); })
      }

    })
  }

  /** getDebtAmountList function to calculate the total borrowed amount
   * of the user.
   **/
  getDebtAmountList(): void {

    this.dashboardService.getDebtAmountList().subscribe(data => {
      //this.debtAmountList = data;
      let sum: number = 0

      //  To get user name by user id and
      for (let item of data) {
        this.dashboardService.getUserNameById(item.owesFromYou).subscribe((res) => {
          if (res.userName != '' || null || undefined) {
            item.friendName = res.userName;
            this.debtAmountList.push(item);
          }
        },
          (error) => {
            console.log('No debt amount of ' + this.userName);
          })
      }
    })

  }

  /**  calculateAmount function to calculate owe/owed amount
   * @param arr : array of type BorrowedAmountDetails or DebtAmountDetails
   * @returns sum : sum of the value of amount of the list
   **/
  calculateAmount(arr: BorrowedAmountDetails[] | DebtAmountDetails[]): number {
    let sum: number = 0;
    for (let item of arr) {
      sum += item.amount
    }
    return sum;
  }

}
