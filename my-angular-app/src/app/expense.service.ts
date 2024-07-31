import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = 'http://localhost:8083/api'; // Adjust the base URL as needed

  constructor(private http: HttpClient) { }

  createExpense(expense: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/expenses`, expense);
  }

  createEmployeeSalaries(salaries: any[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/employee`, salaries);
  }
}
