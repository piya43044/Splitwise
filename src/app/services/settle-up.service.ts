import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettleUserData } from '../models/settleUp.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SettleUpService {
  /**
   * constructor
   */
  constructor(private http:HttpClient) {}
  private baseUrl = 'https://localhost:44329';
  
  /**
   * getUnsettledList are used to get data from the Api
   * @returns unsettled list
   */
  getUnsettledList(){
    return this.http.get<SettleUserData[]>(this.baseUrl+'/api/app/exp-list/un-setteled-list')
  }
  
  /**
   * settlePayment are used to update payment 
   * @param payI used to store payment ID
   * @returns status of settle-up
   */
  settlePayment(payId: string): Observable<string> {
    const url = `${this.baseUrl}/api/Payment/settle`;
    return this.http.put<string>(`https://localhost:44329/api/Payment/settle?Id=${payId}`,null );
  }
}


