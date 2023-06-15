import { Injectable } from '@angular/core';
import { BorrowedAmountDetails, CurrentUserNameByIdResult, DebtAmountDetails, Profile } from '../models/profile';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  userProfile !: Profile;

  // constructor
  constructor(
    private http: HttpClient
  ) { }



  /** CurrentUserDetails function to call get api
   * and get Current User details By user-id from server
   * @returns current user's profile details
   **/
  getCurrentUserDetails(): Observable<Profile> {
    const currentUserDetailsURL = 'https://localhost:44329/api/account/my-profile';
    return this.http.get<Profile>(currentUserDetailsURL, { withCredentials: true });
  }

  /** getBorrowedAmountList function to call get api
   * and get Current User details By user-id from server
   * @returns current user's Borrowed Amount list
   **/
  getBorrowedAmountList(): Observable<BorrowedAmountDetails[]> {
    const BorrowedAmountListURL = 'https://localhost:44329/api/app/user-outstanding-details/payment-info-for-current-user';
    return this.http.get<BorrowedAmountDetails[]>(BorrowedAmountListURL, { withCredentials: true });
  }

  /** getDebtAmountList function to call get api
   * and get Current User details By user-id from server
   * @returns current user's debt Amount list
   **/
  getDebtAmountList(): Observable<DebtAmountDetails[]> {
    const DebtAmountListURL = 'https://localhost:44329/api/app/user-outstanding-details/who-will-give-to-current-user';
    return this.http.get<DebtAmountDetails[]>(DebtAmountListURL, { withCredentials: true });
  }

  getUserNameById(id: string): Observable<any>{
    const getUserNameByIdURL = 'https://localhost:44329/api/identity/users/'+id;
    return this.http.get<any>(getUserNameByIdURL , { withCredentials: true });
  }
}
