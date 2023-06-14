import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { User_register } from '../models/register.model';
import { Observable } from 'rxjs';
import { User_login } from '../models/login.model';


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
   * @retun http response
   *  */
  addUsers (addUserRequest : User_register): Observable<HttpResponse<User_register>>{
    return this.http.post<User_register>(this.baseUrl + '/api/account/register', addUserRequest, { observe: 'response' });
  }
   /**
   * logUsers are used to post data in the Api
   * @retun http response
   *  */
  logUser(logUserRequest : User_login) : Observable<HttpResponse<any>>{
    return this.http.post<User_login>(this.baseUrl+ '/api/account/login',logUserRequest,{observe :'response',withCredentials:true})
  }
  /**
   * currentUser are used to get data from the Api
   * @retun http response
   *  */
  currentUser(){
    return this.http.get(this.baseUrl+'/api/app/current-user/current-user-name', { withCredentials:true, responseType: 'text' })
  }
}