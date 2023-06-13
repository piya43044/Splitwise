import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../models/settleUp.model';
@Injectable({
  providedIn: 'root'
})
export class SettleUpService {

  constructor(private http:HttpClient) {}
  // paymentId = '';
  // ownedDetails: UserData[] = [];
  private baseUrl = 'https://localhost:44329';

  getUnsettledList(){
    return this.http.get<UserData[]>(this.baseUrl+'/api/app/exp-list/un-setteled-list')
  }
}
