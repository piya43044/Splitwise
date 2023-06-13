import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Groups, GroupMembers, GroupMembersToAdd } from '../models/groups';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  group !: Groups;

  constructor(private http: HttpClient) { }

  /**create group function to call post api
   * and send group details to server
   **/
  createGroup(data: Groups): Observable<any> {
    const createGroupURL: string = 'https://localhost:44329/api/app/group';
    console.log(JSON.stringify(data))
    return this.http.post<any>(createGroupURL, data)
  }

  /** add members to group function to call post api
   * and send members details to server to add in group
   **/
  addMembersToGroup(data  : GroupMembersToAdd): Observable<any>{
    const addGroupMembers = 'https://localhost:44329/api/app/group-member'

    return this.http.post<any>(addGroupMembers, data)
  }

  /** Group list function to call get api
   * and get group details from server
   **/
  getGroupList(): Observable<any> {
    const groupListURL: string = 'https://localhost:44329/api/app/group';
    return this.http.get<any>(groupListURL)
  }
  /** Group list function to call get api
   * and get group details from server
   **/
  getGroupMembers(): Observable<any> {
    let id = '3a0bacaa-d885-ca69-2e73-2c5e40e677c0'
    const groupListURL: string = 'https://localhost:44329/api/app/group-member/group-members/'+id
    return this.http.get<any>(groupListURL)
  }


  /** delete group from list function to call delete api
   * delete group from list in server
   **/
  deleteGroupFromlist(id : string): Observable<any> {
    const deleteGroupFromlistURL: string = 'https://localhost:44329/api/app/group/'+id;
    return this.http.get<any>(deleteGroupFromlistURL)
  }

  /** CurrentUser function to call get api
   * and get name of current user from server
   **/
  getCurrentUser(): Observable<any> {
    const currentUserURL: any = 'https://localhost:44329/api/app/current-user/current-user-name';
    return this.http.get<any>(currentUserURL)
  }

  /** CurrentUserDetails function to call get api
   * and get Current User details By user-id from server
   **/
  getCurrentUserDetails(): Observable<any> {
    const currentUserDetailsURL ='https://localhost:44329/api/account/my-profile'
    return this.http.get<any>(currentUserDetailsURL)
  }





  // ///////////////////////////////////////code for testing purpose ////////////////////////////


  loginURL = 'https://localhost:44329/api/account/Login';

  getAdminLogin(): Observable<any> {
    const data = {
      userNameOrEmailAddress: "admin",
      password: "1q2w3E*",
      rememberMe: true
    }
    console.log(JSON.stringify(data));
    return this.http.post<any>(this.loginURL, data, { observe: 'response' })
  }

  getLogin(): Observable<any> {
    const data = {
      userNameOrEmailAddress: "mayank",
      password: "Mayank@123",
      rememberMe: true
    }
    console.log(JSON.stringify(data));
    return this.http.post<any>(this.loginURL, data, { observe: 'response' })
  }

  resgisterUser(): Observable<any> {
    const reguisterURL = 'https://localhost:44329/api/account/register'
    const data = {

        userName: "harish",
        emailAddress: "harish@example.com",
        password: "Harish@123",
        appName: "EMS"

    }
    console.log(JSON.stringify(data));
    return this.http.post<any>(reguisterURL, data, { observe: 'response' })
  }

  testApi(): Observable<any> {
    const url = 'https://localhost:44329/api/account/login'
    const data = {
      userNameOrEmailAddress: "mayank",
      password: "Mayank@123",
      rememberMe: true
    }
    return this.http.post(url, data);
  }

  testApi2() {
    const url = 'https://localhost:44329/api/identity/users'
    return this.http.get<any>(url)
  }
  logoutUser() {
    const url = 'https://localhost:44329/api/account/logout'
    return this.http.get<any>(url)
  }




}
