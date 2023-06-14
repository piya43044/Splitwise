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
  private expenseUnsettleUrl = "https://localhost:44329/api/app/exp-list/un-setteled-list";

  /**
   * Constructor
   *  */ 
  constructor(private http: HttpClient) { }

  /**
   * Get the expense list from the api
   * @returns expense list
   */
  getExpenseList(): Observable<Expense>{
    return this.http.get<Expense>(this.baseUrl);
  }

  /**
   * Delete the expense from the api
   * @param id of expense as string
   * @returns delete expense response
   */
  deleteExpense(id: string): Observable<string>{
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }

  /**
   * Post the expense to the api
   * @param expense item(details)
   * @returns response of the expense
   */
  postExpense(expense: ExpenseItem): Observable<ExpenseItem> {
    return this.http.post<ExpenseItem>(this.baseUrl, expense);
  }

  /**
   * Get expense detail by id from the api
   * @param id of expense as string
   * @returns particular expense detail
   */
  getExpenseDetailById(id: string): Observable<ExpenseItem>{
    return this.http.get<ExpenseItem>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update expense detail by id and expense object
   * @param id of expense as string, expense details
   * @returns updated data of expense
   */
  updateExpenseByID(id: string, expense: ExpenseItem): Observable<ExpenseItem>{
    return this.http.put<ExpenseItem>(`${this.baseUrl}/${id}`,expense);
  }

  /**
   * Get expense unsettle data from the api
   * @returns unsettle detail of expense
   */
  getExpenseUnsettleList(): Observable<ExpenseItem[]>{
    return this.http.get<ExpenseItem[]>(this.expenseUnsettleUrl);
  }

}
