import { Injectable } from '@angular/core';
import { Friend } from '../models/friend.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  private baseUrl = "https://localhost:44329/api/app/add-friend/friend";
  private friendUrl = "https://localhost:44329/api/app/friend";

  constructor(private http: HttpClient) { }

  /**
   * Post the data of friend in the server
   * @param friend data (name and email)
   * @returns friend invite data
   */
  postFriend(friend: Friend): Observable<Friend> {
   
    return this.http.post<Friend>(`${this.baseUrl}?name=${friend.friendName}&userMail=${encodeURIComponent(friend.friendEmail)}`, null);
  }

  /**
   * Get friend list from the api
   * @returns friend list data
   */
  getFriendList(): Observable<Friend[]>{
    return this.http.get<Friend[]>(`${this.friendUrl}/friends`);
  }

  /**
   * Delete friend by their id from the api
   * @param id of friend for delete
   * @returns delete friend response
   */
  deleteFriend( id: string): Observable<string>{
    return this.http.delete<string>(`${this.friendUrl}/${id}/friend`)
  }
}
