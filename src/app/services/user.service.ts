import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { UserRegister } from '../models/register.model';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/userDetail.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * This is base url link which is common for all
   *  */
  private baseUrl = 'https://localhost:44329';

  constructor(private http : HttpClient) { }

   /**
     * addUsers are used to post data in the Api
     * @retun register user details
     */
  addUsers (addUserRequest : UserRegister): Observable<HttpResponse<UserRegister>>{
    return this.http.post<UserRegister>(this.baseUrl + '/api/account/register', addUserRequest, { observe: 'response' });

   /**
     * getUserDetaol are used to get data from the Api
     * @retun  user details
     */
  getUserDetail(id: string): Observable<UserDetail>{
    return this.http.get<UserDetail>(`${this.baseUrl+'/api/identity/users'}/${id}`, { withCredentials: true })

  }
}
