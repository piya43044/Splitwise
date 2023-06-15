import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/userDetail.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = "https://localhost:44329/api/identity/users";

  constructor(private http: HttpClient) { }

  getUserDetail(id: string): Observable<UserDetail>{
    return this.http.get<UserDetail>(`${this.baseUrl}/${id}`, { withCredentials: true })
  }
}
