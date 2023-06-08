import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { User_register } from '../models/register.model';
import { Observable } from 'rxjs';

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
}
