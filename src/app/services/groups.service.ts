import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Groups, GroupMembers, GroupMembersToAdd, GroupList, GroupListResult, UserProfile, GroupMembersResult, GroupResult } from '../models/groups';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ExpenseItem } from '../models/expenseItem.model';
import { GroupItem } from '../models/groupItem.model';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  group !: Groups;
  groupList !: GroupList[];
  getSelectedGroupIndex !: number;

  constructor(
    private http: HttpClient
  ) { }

  /**create group function to call post api
   * and send group details to server
   * @returns Group details
   **/
  createGroup(data: Groups): Observable<GroupResult> {
    const createGroupURL: string = 'https://localhost:44329/api/app/group';
    return this.http.post<GroupResult>(createGroupURL, data, { withCredentials: true });
  }

  /** add members to group function to call post api
   * and send members details to server to add in group
   **/
  addMembersToGroup(data: GroupMembersToAdd): Observable<void> {
    const addGroupMembersURL = 'https://localhost:44329/api/app/group-member';
    return this.http.post<void>(addGroupMembersURL, data);
  }

  /** Group list function to call get api
   * and get group details from server
   * @returns Group list of user
   **/
  getGroupList(): Observable<GroupListResult> {
    const groupListURL: string = 'https://localhost:44329/api/app/group';
    return this.http.get<GroupListResult>(groupListURL);
  }

  /** Group list function to call get api
   * and get group details from server
   * @returns Group members array of a group
   **/
  getGroupMembers(): Observable<GroupMembersResult[]> {
    let id = '3a0bacaa-d885-ca69-2e73-2c5e40e677c0'
    const groupListURL: string = 'https://localhost:44329/api/app/group-member/group-members/' + id;
    return this.http.get<GroupMembersResult[]>(groupListURL);
  }

  /** Get the data of group by groupId on the api
   * @returns Group details
   **/
  getGroupDetailByGroupId(groupId: string): Observable<GroupItem>{
    return this.http.get<GroupItem>('https://localhost:44329/api/app/group/'+groupId);
  }

  /** delete group from list function to call delete api
   * delete group from list in server
   **/
  deleteGroupFromlist(id: string): Observable<void> {
    const deleteGroupFromlistURL: string = 'https://localhost:44329/api/app/group/' + id;
    return this.http.get<void>(deleteGroupFromlistURL);
  }

  /** getExpensesOfGroup function to call get api
   * and get Current groups expenses details from server
   * @returns current groups expenses details
   **/
  getExpensesOfGroup(): Observable<ExpenseItem[]> {
    const ExpensesOfGroupURL = 'https://localhost:44329/api/app/exp-list/expense-list';
    return this.http.get<ExpenseItem[]>(ExpensesOfGroupURL, { withCredentials: true });
  }

  /** CurrentUser function to call get api
   * and get name of current user from server
   * @returns current user's name
   **/
  getCurrentUser(): Observable<string> {
    const currentUserURL = 'https://localhost:44329/api/app/current-user/current-user-name';
    return this.http.get(currentUserURL, { withCredentials: true, responseType: 'text' });
  }

  /** CurrentUserDetails function to call get api
   * and get Current User details By user-id from server
   * @returns current user's profile details
   **/
  getCurrentUserDetails(): Observable<UserProfile> {
    const currentUserDetailsURL = 'https://localhost:44329/api/account/my-profile';
    return this.http.get<UserProfile>(currentUserDetailsURL, { withCredentials: true });
  }

}
