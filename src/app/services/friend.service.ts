import { Injectable } from '@angular/core';
import { Friend } from '../models/friend.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl = "https://localhost:44329/api/app/add-friend/friend"

  constructor(private http: HttpClient) { }

  /**
   * Post the data of friend in the server
   * @param friend - Friend class
   * @returns Observable<Friend> which is having the data of Friend class
   */
  postFriend(friend: Friend): Observable<Friend> {
   
    return this.http.post<Friend>(`${this.baseUrl}?name=${friend.friendName}&userMail=${encodeURIComponent(friend.friendEmail)}`, null);
  }
}
