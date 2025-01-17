import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';



@Component({
  selector: 'app-company-invoice-generation',
  templateUrl: './company-invoice-generation.component.html',
  styleUrl: './company-invoice-generation.component.scss'
})
export class CompanyInvoiceGenerationComponent {

  companyName = 'Microsoft';
  employeeData: any[] = [];
  totalDue1: number = 0;
  totalDue: number = 0;

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.employeeData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.employeeData = this.employeeData.slice(1).map((row: any) => ({
        EmpID: row[1],
        Name: row[2],
        Mobile: row[3],
        Designation: row[4],
        FromDate:this.convertExcelDate(row[5]),
        ToDate: this.convertExcelDate(row[6]),
        Due: parseFloat(row[7]) || 0
      }));
    };
    reader.readAsBinaryString(target.files[0]);
  }
 
  convertExcelDate(excelDate: number): string {
    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    return date.toLocaleDateString();
  }

  calculateTotal() {
    this.totalDue = this.employeeData.reduce((sum, emp) => sum + emp.Due, 0);
  }

  generateInvoice() {
    this.totalDue1= this.employeeData.reduce((sum, emp) => sum + emp.Due, 0);
    const doc = new jsPDF();

  // Add Company Information
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold'); // Set font to bold
  doc.setTextColor(22, 160, 133); // Set text color to red (RGB)
  doc.text('INVOICE', 105, 20, { align: 'center' });
  
 // Reset font style and color
 doc.setFont(undefined, 'normal');
 doc.setTextColor(0, 0, 0); // Reset text color to black


  doc.setFontSize(12);
  doc.text('Hostel Name', 14, 30);
  doc.text('89 Hostel Street, City, State, Country', 14, 35);
  doc.text('123-456-7890', 14, 40);
  doc.text('your@hostelemail.com', 14, 45);

  // Add Billed To Information
  doc.text('BILLED TO:', 140, 30);
  doc.text('Your Client Company Name', 140, 35);
  doc.text('34 Your Client Company Street, City, State, Country', 140, 40);
  doc.text('234-567-5678', 140, 45);
  doc.text('your@clientcompanyemail.com', 140, 50);

  // Add Invoice Details
  const invoiceYStart = 65;
  const invoiceDetails = [
    `Invoice No: 000001`,
    `Account No: 00002324`,
    `Issue Date: ${new Date().toLocaleDateString()}`,
    `Due Date: 01/08/2024`
  ];
  invoiceDetails.forEach((detail, index) => {
    doc.text(detail, 140, invoiceYStart + (index * 5));
  });

  // Add Table
  (doc as any).autoTable({
    head: [['Employee Id', 'Name', 'Designation', 'Due', 'TOTAL']],
    body: this.employeeData.map((employee: any) => [
      employee.EmpID,
      employee.Name,
      employee.Designation,
        `$${employee.Due.toFixed(2)}`,
      `$${employee.Due.toFixed(2)}`
    ]),
    startY: 85,
    theme: 'grid',
    headStyles: { fillColor: [22, 160, 133] },
    margin: { left: 14, right: 14 },
    styles: { cellPadding: 2, fontSize: 10 }
  });

  // Calculate and Display Totals
  doc.setFontSize(12);
  let finalY = (doc as any).lastAutoTable.finalY + 10;
  const subTotal = this.totalDue1;
  const tax = subTotal * 0.1; // 10% tax
  const total = subTotal + tax;
  doc.text(`Sub Total: $${this.totalDue1.toFixed(2)}`, 140, finalY);
  doc.text(`Tax (10%): $${(this.totalDue1 * 0.1).toFixed(2)}`, 140, finalY + 5);
  doc.text(`TOTAL: $${(this.totalDue1 + (this.totalDue1 * 0.1) - 23).toFixed(2)}`, 140, finalY + 20);

  // Add Footer
  doc.text('THANK YOU FOR YOUR BUSINESS', 14, finalY + 30);
  doc.text('Invoice Terms: E.g Payment Instructions (Account Number, Bank and Bank Account Holder)', 14, finalY + 35);

  // Save PDF
  doc.save('invoice.pdf');
  }

  
}
