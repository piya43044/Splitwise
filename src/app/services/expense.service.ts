import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { ExpenseItem } from '../models/expenseItem.model';

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

  /**
   * Post the expense to the api
   * @param expense - ExpenseItem
   * @returns Observable<ExpenseItem>
   */
  postExpense(expense: ExpenseItem): Observable<ExpenseItem> {
    return this.http.post<ExpenseItem>(this.baseUrl, expense);
  }

  /**
   * Get expense detail by id from the api
   * @param id - string
   * @returns Observable<ExpenseItem>
   */
  getExpenseDetailById(id: string): Observable<ExpenseItem>{
    return this.http.get<ExpenseItem>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update expense detail by id and expense object
   * @param id - string, expense - ExpenseItem
   * @returns Observable<ExpenseItem>
   */
  updateExpenseByID(id: string, expense: ExpenseItem): Observable<ExpenseItem>{
    return this.http.put<ExpenseItem>(`${this.baseUrl}/${id}`,expense);
  }

}
