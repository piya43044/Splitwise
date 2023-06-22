import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Groups, GroupMembers, GroupMembersToAdd, GroupList, GroupListResult, UserProfile, GroupMembersResult, GroupResult, FriendList, EditGroup } from '../models/groups';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ExpenseItem } from '../models/expenseItem.model';
import { GroupItem } from '../models/groupItem.model';
import { CurrentUserNameByIdResult } from '../models/profile';


@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  baseURL : string = 'https://localhost:44329';

  group !: Groups;
  groupList : GroupList[] =[];
  friendList: FriendList[] = [];
  getSelectedGroupIndex !: number;

  constructor(
    private http: HttpClient
  ) { }

  /**create group function to call post api
   * and send group details to server
   * @param data of group to add
   * @returns Group details
   **/
  createGroup(data: Groups): Observable<GroupResult> {
    const createGroupURL: string = this.baseURL+'/api/app/group';
    return this.http.post<GroupResult>(createGroupURL, data, {withCredentials : true});
  }

  /**edit group function to call post api
   * and send group details to server
   * @param data of group to edit
   * @returns Group details
   **/
  editGroup(data: EditGroup , id: string): Observable<GroupResult> {
    const editGroupURL: string = this.baseURL+'/api/app/group/'+id;
    return this.http.put<GroupResult>(editGroupURL, data, {withCredentials : true});
  }

  /** add members to group function to call post api
   * and send members details to server to add in group
   **/
  addMembersToGroup(data: GroupMembersToAdd): Observable<void> {
    const addGroupMembersURL = this.baseURL+'/api/app/group-member';
    return this.http.post<void>(addGroupMembersURL, data,{withCredentials : true});
  }

  /** Group list function to call get api
   * and get group details from server
   * @returns Group list of user
   **/
  getGroupList(): Observable<GroupListResult> {
    let id =''
    const groupListURL: string = this.baseURL+'/api/app/group';
    return this.http.get<GroupListResult>(groupListURL,{ withCredentials: true });
  }

  /** Group list function to call get api
   * and get group details from server
   * @returns Group members array of a group
   **/
  getGroupMembers( id : string): Observable<GroupMembersResult[]> {
    const groupMembersListURL: string = this.baseURL+'/api/app/group-member/group-members/' +id;
    return this.http.get<GroupMembersResult[]>(groupMembersListURL,{ withCredentials: true });
  }

  /** Get the data of group by groupId on the api
   * @returns Group details
   **/
  getGroupDetailByGroupId(groupId: string): Observable<GroupItem>{
    return this.http.get<GroupItem>(this.baseURL+'/api/app/group/'+groupId,{ withCredentials: true });
  }

  /** delete group from list function to call delete api
   * delete group from list in server
   **/
  deleteGroupFromlist(id: string): Observable<void> {
    console.log(id);

    const deleteGroupFromlistURL: string = this.baseURL+'/api/app/group/'+id;
    return this.http.delete<void>(deleteGroupFromlistURL,{ withCredentials: true });
  }

  /** getExpensesOfGroup function to call get api
   * and get Current groups expenses details from server
   * @returns current groups expenses details
   **/
  getExpensesOfGroup(): Observable<ExpenseItem[]> {
    const ExpensesOfGroupURL = this.baseURL+'/api/app/exp-list/expense-list';
    return this.http.get<ExpenseItem[]>(ExpensesOfGroupURL, { withCredentials: true });
  }

  /** getUserNameByID function to call get api
   * and get name of current user from server
   * @param id : user id to get name of user
   * @returns current user's name
   **/
  getUserNameByID(id: string): Observable<FriendList> {
    const currentUserURL = this.baseURL+'/api/app/find-the-user-name/user-by-id/'+id;
    return this.http.get<FriendList>(currentUserURL, { withCredentials: true });
  }

  /** CurrentUserDetails function to call get api
   * and get Current User details By user-id from server
   * @returns current user's profile details
   **/
  getCurrentUserDetails(): Observable<UserProfile> {
    const currentUserDetailsURL = this.baseURL+'/api/account/my-profile';
    return this.http.get<UserProfile>(currentUserDetailsURL, { withCredentials: true });
  }

  /** getUserList function to call get api
   * and get Current User details By user-id from server
   * @returns friend list
   **/
  getUserList(): Observable<FriendList[]> {
    const userListURL = this.baseURL+'/api/app/find-the-user-name/user-list';
    return this.http.get<FriendList[]>(userListURL, { withCredentials: true });
  }
}
