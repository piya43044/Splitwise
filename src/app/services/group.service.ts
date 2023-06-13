import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/group.model';
import { Observable } from 'rxjs';
import { GroupItem } from '../models/groupItem.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseUrl="https://localhost:44329/api/app/group";
  userId = "3a0bb1b5-7bff-6c67-b7f2-117875103553";

  // constructor
  constructor(private http: HttpClient) { }

  /**
   * Get the data of group by groupId on the api
   * @returns Observable<Group>
   */
  getGroupDetailByGroupId(groupId: string): Observable<GroupItem>{
    return this.http.get<GroupItem>(`${this.baseUrl}/${groupId}`);
  }

  getGroupList(): Observable<Group>{
    return this.http.get<Group>(this.baseUrl)
  }
}
