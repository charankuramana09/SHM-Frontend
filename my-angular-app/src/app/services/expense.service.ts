import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private baseUrl = 'http://localhost:8083';

  constructor(private http: HttpClient) { }

  createExpense(expense: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/expenses/save`, expense, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  createEmployeeSalaries(payload: any, receiptFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('empName', payload.empName ?? '');
    formData.append('designation', payload.designation ?? '');
    formData.append('salary', payload.salary?.toString() ?? '');
    formData.append('paymentDate', payload.paymentDate ?? '');
    if (receiptFile) {
      formData.append('receiptAttached', receiptFile, receiptFile.name);
    }

    return this.http.post<any>(`${this.baseUrl}/employee`, formData);
  }

  createHostelPayment(monthlyRent: any, receiptFile: File): Observable<any> {
    console.log('Monthly Rent Data:', monthlyRent); // Add this line
    const formData: FormData = new FormData();
    formData.append('hostelName', monthlyRent.hostelName);
    formData.append('ownerName', monthlyRent.ownerName);
    
    // Check if paidDate is valid before converting it
    if (monthlyRent.paidDate) {
        formData.append('paidDate', new Date(monthlyRent.paidDate).toISOString().split('T')[0]);
    } else {
        console.error('Invalid paidDate:', monthlyRent.paidDate); // Log if paidDate is invalid
    }
    
    formData.append('paidAmount', monthlyRent.paidAmount.toString());
    formData.append('totalAmount', monthlyRent.totalAmount.toString());
    formData.append('receiptFile', receiptFile);

    return this.http.post<any>(`${this.baseUrl}/api/monthly/create`, formData);
}
}
