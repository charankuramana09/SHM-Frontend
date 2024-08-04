import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:8083/api/employees';
  private apiUrl1 = 'http://localhost:8083/api/monthly';
  private apiUrl2 = 'http://localhost:8083/expenses';

  constructor(private http: HttpClient) { }

  submitMonthlyRent(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl1}/submit`, data);
  }

  submitEmployeeSalaries(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  submitExpense(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl2, formData);
  }
}
