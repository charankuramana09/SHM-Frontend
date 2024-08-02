import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'http://localhost:8083/expenses/';

  constructor(private http: HttpClient) { }

  createExpense(expense: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/expenses/save`, expense, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  createEmployeeSalaries(employeeSalaries: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/employee/createEmployee`, employeeSalaries, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  createHostelPayment(monthlyRent: any, receiptFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('hostelName', monthlyRent.hostelName);
    formData.append('ownerName', monthlyRent.ownerName);
    formData.append('paidDate', monthlyRent.paidDate.toISOString().split('T')[0]);
    formData.append('paidAmount', monthlyRent.paidAmount.toString());
    formData.append('totalAmount', monthlyRent.totalAmount.toString());
    formData.append('receiptFile', receiptFile);

    return this.http.post<any>(`${this.baseUrl}/save`, formData);
  }
}
