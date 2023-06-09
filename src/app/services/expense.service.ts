import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  
  private baseUrl = "https://localhost:44329/api/app/expense";

  // constructor
  constructor(private http: HttpClient) { }

  /**
   * Get the expense list from the api
   * @returns Observable<Expense>
   */
  getExpenseList(): Observable<Expense>{
    return this.http.get<Expense>(this.baseUrl);
  }

  /**
   * Delete the expense from the api
   * @param id-string
   * @returns Observable<string>
   */
  deleteExpense(id: string): Observable<string>{
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }

}
