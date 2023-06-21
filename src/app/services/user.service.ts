import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLoginResult, UserLogin } from '../models/login.model';
import { CookieService } from 'ngx-cookie-service';
import { UserRegister } from '../models/register.model';
import { UserDetail } from '../models/userDetail.model';
import { UserOutstandingDetail } from '../models/userOutstandingDetail.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:44329';
  private userOweToUrl = "https://localhost:44329/api/app/user-outstanding-details/payment-info-for-current-user";
  private userOweFromUrl = "https://localhost:44329/api/app/user-outstanding-details/who-will-give-to-current-user";
  userOutstandingList: UserOutstandingDetail[] = [];
  /**
   * constructor
   */
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  /**
    * addUsers are used to post data in the Api
    * @param addUserRequest store the data of the user credential
    * @retun http response
    */
  addUsers(addUserRequest: User_register): Observable<HttpResponse<User_register>> {
    const url = `${this.baseUrl}/api/account/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User_register>(url, addUserRequest, { headers, observe: 'response', withCredentials: true });
  }

  /**
   * login are used to post data in the api
   * @param logUserRequest store the data of the user credential
   * @returns http response
   */
  login(logUserRequest: UserLogin): Observable<HttpResponse<UserLoginResult>> {
    const url = `${this.baseUrl}/api/account/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UserLoginResult>(url, logUserRequest, { headers, observe: 'response', withCredentials: true });
    }
  
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

}
