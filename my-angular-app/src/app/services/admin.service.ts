  import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface AdminData {
  name: string;
  email: string;
  role: string;
  lastLogin: string;
  paymentHistory: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin/details'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAdminDetails(): Observable<AdminData[]> {
    return this.http.get<AdminData[]>(this.apiUrl);
  }
  sendInvoice(pdfOutput: Blob, email: string, companyName: string): Observable<string> {
    const formData = new FormData();
    formData.append('file', pdfOutput, 'invoice.pdf');
    formData.append('email', email);
    formData.append('name', companyName);

    return this.http.post('http://localhost:8081/email/sendInvoice', formData, { responseType: 'text' });
  }
  validateMobileNumbers(mobileNumbers: number[]): Observable<any> {
    return this.http.post<any>('http://localhost:8081/admin/validate-mobile-numbers', mobileNumbers);
  }
}
