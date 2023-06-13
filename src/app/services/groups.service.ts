import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Groups, GroupMembers, GroupMembersToAdd, GroupList, GroupListResult, UserProfile, GroupMembersResult } from '../models/groups';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  group !: Groups;

  constructor(private http: HttpClient) {}

  /**create group function to call post api
   * and send group details to server
   **/
  createGroup(data: Groups): Observable<Groups> {
    const createGroupURL: string = 'https://localhost:44329/api/app/group';
    return this.http.post<Groups>(createGroupURL, data);
  }

  /** add members to group function to call post api
   * and send members details to server to add in group
   **/
  addMembersToGroup(data  : GroupMembersToAdd): Observable<GroupMembersToAdd>{
    const addGroupMembersURL = 'https://localhost:44329/api/app/group-member';
    return this.http.post<GroupMembersToAdd>(addGroupMembersURL, data);
  }

  /** Group list function to call get api
   * and get group details from server
   **/
  getGroupList(): Observable<GroupListResult> {
    const groupListURL: string = 'https://localhost:44329/api/app/group';
    return this.http.get<GroupListResult>(groupListURL);
  }

  /** Group list function to call get api
   * and get group details from server
   **/
  getGroupMembers(): Observable<GroupMembersResult[]> {
    let id = '3a0bacaa-d885-ca69-2e73-2c5e40e677c0'
    const groupListURL: string = 'https://localhost:44329/api/app/group-member/group-members/'+id;
    return this.http.get<GroupMembersResult[]>(groupListURL);
  }

  /** delete group from list function to call delete api
   * delete group from list in server
   **/
  deleteGroupFromlist(id : string): Observable<void> {
    const deleteGroupFromlistURL: string = 'https://localhost:44329/api/app/group/'+id;
    return this.http.get<void>(deleteGroupFromlistURL);
  }

  /** CurrentUser function to call get api
   * and get name of current user from server
   **/
  getCurrentUser(): Observable<string> {
    const currentUserURL = 'https://localhost:44329/api/app/current-user/current-user-name';
    return this.http.get<string>(currentUserURL);
  }

  /** CurrentUserDetails function to call get api
   * and get Current User details By user-id from server
   **/
  getCurrentUserDetails(): Observable<UserProfile> {
    const currentUserDetailsURL ='https://localhost:44329/api/account/my-profile';
    return this.http.get<UserProfile>(currentUserDetailsURL);
  }
}
