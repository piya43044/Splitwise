import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User_register } from '../models/register.model';
import { User_login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:44329';

  constructor(private http: HttpClient) { }

  addUsers(addUserRequest: User_register): Observable<HttpResponse<User_register>> {
    const url = `${this.baseUrl}/api/account/register`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User_register>(url, addUserRequest, { headers, observe: 'response', withCredentials: true });
  }

  logUser(logUserRequest: User_login): Observable<HttpResponse<any>> {
    const url = `${this.baseUrl}/api/account/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User_login>(url, logUserRequest, { headers, observe: 'response'});
  }

  currentUser(): Observable<string> {
    const url = `${this.baseUrl}/api/app/current-user/current-user-name`;
    const headers = new HttpHeaders();
    return this.http.get<string>(url, { headers, withCredentials: true });
  }
}
