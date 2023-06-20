import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User_register } from '../models/register.model';
import { UserLoginResult, UserLogin } from '../models/login.model';

import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:44329';
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
}
