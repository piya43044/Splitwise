import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Profile, BorrowedAmountDetails, DebtAmountDetails } from '../models/profile';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
  loading: boolean = true;

  isBorrowedAmountCalculated: boolean = false;
  isDebtAmountCalculated: boolean = false;

  totalOwe: number = 0;
  totalOwed: number = 0;
  totalBalance: number = 0;

  // constructor
  constructor(
    private dashboardService: DashboardService,
    private toastrService: ToastrService
  ) { }

  /** ngOnInit method
   **/
  ngOnInit(): void {
    //function call to get user's profile and owe/owed amount details
    this.getCurrentUserDetails();
    this.getBorrowedAmountList();
    this.getDebtAmountList();

    // To calculate total spent amount of user
    setInterval(() => {
      if (this.isBorrowedAmountCalculated === true || this.isDebtAmountCalculated === true) {
        this.totalOwe = this.calculateAmount(this.borrowedAmountList);
        this.totalOwed = this.calculateAmount(this.debtAmountList);
        this.totalBalance = this.totalOwed - this.totalOwe;
      }
    })

    // to stop loader of dashboard
    setInterval(() => {
      if (this.isBorrowedAmountCalculated === true && this.isDebtAmountCalculated === true) {
        this.loading = false;
      }
    }, 1000)
  }

  /** CurrentUser function to call get api
   * and get name of current user from server
   **/
  getCurrentUserDetails(): void {
    this.dashboardService.getCurrentUserDetails().subscribe(
      (data) => {
      this.dashboardService.userProfile = data;
      this.userProfile = this.dashboardService.userProfile;
      this.userName = this.dashboardService.userProfile.userName;
    },
      (error) => {
        this.toastrService.success('Error in getting Profile details of user ', 'Error', {
          timeOut: 2000,
        });
      })

  }

  /** getBorrowedAmountList function to get the total borrowed amount list
   * of the user and calculate total borrowed amount.
   **/
  getBorrowedAmountList(): void {
    this.loading = true;
    this.dashboardService.getBorrowedAmountList().subscribe(
      (data) => {

      //  To get user name by user id and calculate amount
      for (let item of data) {
        this.dashboardService.getUserNameById(item.whomeToGive).subscribe(
          (res) => {
          if (res.userName != '' || null || undefined) {
            item.friendName = res.userName;
            this.borrowedAmountList.push(item);
          }
        },
          (error) => {
            this.toastrService.success('No Borrowed amount of ' + this.userName, 'Error', {
              timeOut: 2000,
            });
          })
      }

    },
    (error)=>{
      this.toastrService.success('No Borrowed amount details of ' + this.userName, 'Error', {
        timeOut: 2000,
      });
    })
    this.isBorrowedAmountCalculated = true;

  }

  /** getDebtAmountList function to calculate the total borrowed amount
   * of the user.
   **/
  getDebtAmountList(): void {
    this.loading = true;
    this.dashboardService.getDebtAmountList().subscribe(
      (data) => {

      //  To get user name by user id and
      for (let item of data) {
        this.dashboardService.getUserNameById(item.owesFromYou).subscribe(
          (res) => {
          if (res.userName !== '' || null || undefined) {
            item.friendName = res.userName;
            this.debtAmountList.push(item);
          }
        },
          (error) => {
            this.toastrService.success('No debt amount of ' + this.userName, 'Error', {
              timeOut: 2000,
            });
          })
      }
    },
    (error)=>{
      this.toastrService.success('No debt amount details of ' + this.userName, 'Error', {
        timeOut: 2000,
      });
    })
    this.isDebtAmountCalculated = true;


  }

  /**  calculateAmount function to calculate owe/owed amount
   * @param listItems : array of type BorrowedAmountDetails or DebtAmountDetails
   * @returns sum : sum of the value of amount of the list
   **/
  calculateAmount(listItems: BorrowedAmountDetails[] | DebtAmountDetails[]): number {
    let sum: number = 0;
    for (let item of listItems) {
      sum += item.amount;
    }
    return sum;
  }

}
