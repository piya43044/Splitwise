import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../models/group.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private baseUrl="https://localhost:44329/api/app/group/groups-belonging-to-user";
  userId = "3a0ba7a5-d258-8665-b647-039303686697";

  // constructor
  constructor(private http: HttpClient) { }

  /**
   * Get the data of group by their userId on the api
   * @returns Observable<Group>
   */
  getGroupListByUser(): Observable<Group>{
    return this.http.get<Group>(`${this.baseUrl}/${this.userId}`);
  }

}
