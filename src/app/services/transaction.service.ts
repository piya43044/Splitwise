import { Injectable } from '@angular/core';
import { TransactionList } from '../models/transactionList.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'https://localhost:44329'
  /**
   * constructor
   */
  constructor(private http: HttpClient) { }

  /**
   * getList are used to get data from the api
   * @returns payment list
   */
  getPaymentList(): Observable<TransactionList[]> {
    return this.http.get<TransactionList[]>(this.baseUrl + '/api/payments/list', { withCredentials: true })
  }
}
