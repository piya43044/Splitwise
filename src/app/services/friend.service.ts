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
   * @param friend - Friend
   * @returns Observable<Friend>
   */
  postFriend(friend: Friend): Observable<Friend> {

    //const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8').set('accept','text/plain');
    //return this.http.post<any>(`${this.baseUrl}?name=${friend.friendName}&userMail=${encodeURIComponent(friend.friendEmail)}`, { headers: headers, responseType: 'text' as 'json' });

    return this.http.post<Friend>(`${this.baseUrl}?name=${friend.friendName}&userMail=${encodeURIComponent(friend.friendEmail)}`, null);
  }
}
