import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { UserRegister } from '../models/register.model';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/userDetail.model';
import { HttpClient } from '@angular/common/http';
import { UserOutstandingDetail } from '../models/userOutstandingDetail.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:44329';
  private userOweToUrl = "https://localhost:44329/api/app/user-outstanding-details/payment-info-for-current-user";
  private userOweFromUrl = "https://localhost:44329/api/app/user-outstanding-details/who-will-give-to-current-user";
  userOutstandingList: UserOutstandingDetail[] = [];

  constructor(private http : HttpClient) { }

  /**
   * Get the user detail from the api
   * @param id of user for their detail
   * @returns user detail
   */
  getUserDetail(id: string): Observable<UserDetail>{
    return this.http.get<UserDetail>(`${this.baseUrl+'/api/identity/users'}/${id}`, { withCredentials: true })

  }

  /**
   * Get user owe to details from the api
   * @returns user owe details
   */
  getUserOweToDetail(): Observable<UserOutstandingDetail[]>{
    return this.http.get<UserOutstandingDetail[]>(this.userOweToUrl);
  }

  /**
   * Get user owe from details from the api
   * @returns user owe details
   */
  getUserOweFromDetail(): Observable<UserOutstandingDetail[]>{
    return this.http.get<UserOutstandingDetail[]>(this.userOweFromUrl);
  }
   
   /**
     * addUsers are used to post data in the Api
     * @retun register user details
     */
  addUsers (addUserRequest : UserRegister): Observable<HttpResponse<UserRegister>>{
    return this.http.post<UserRegister>(this.baseUrl + '/api/account/register', addUserRequest, { observe: 'response' });
  }
}
