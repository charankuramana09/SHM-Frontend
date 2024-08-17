import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { AdminService } from '../services/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-invoice-generation',
  templateUrl: './company-invoice-generation.component.html',
  styleUrls: ['./company-invoice-generation.component.scss']
})
export class CompanyInvoiceGenerationComponent {
  companyName = 'Microsoft';
  dbEmployeeData: any[] = [];
  employeeData: any[] = [];
  unmatchedData: any[] = [];
  totalDue1: number = 0;
  totalDue: number = 0;
  email: string = '';
  pdfOutput: Blob;
  matchedData: any[] = [];
  mobileNumbers: number[] = [];
  existingMobileNumbers: string[] = [];
  nonExistingMobileNumbers: string[] = [];
  errorMessage: string = '';

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

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
        FromDate: this.convertExcelDate(row[5]),
        ToDate: this.convertExcelDate(row[6]),
        Due: parseFloat(row[7]) || 0
      }));
      this.mobileNumbers = this.employeeData.map((employee: any) => parseInt(employee.Mobile, 10)).filter(mobile => !isNaN(mobile));
      this.validateNumbers(); // Ensure this method is defined
    };
    reader.readAsBinaryString(target.files[0]);
  }

  convertExcelDate(excelDate: number): string {
    const date = new Date((excelDate - (25567 + 2)) * 86400 * 1000);
    return date.toLocaleDateString();
  }

  calculateTotal() {
    this.totalDue = this.dbEmployeeData.reduce((sum, emp) => sum + emp.Due, 0);
  }

  generateInvoice() {
    this.totalDue1 = this.dbEmployeeData.reduce((sum, emp) => sum + emp.Due, 0);
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(22, 160, 133);
    doc.text('INVOICE', 105, 20, { align: 'center' });

    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);

    doc.setFontSize(12);
    doc.text('Hostel Name', 14, 30);
    doc.text('89 Hostel Street, City, State, Country', 14, 35);
    doc.text('123-456-7890', 14, 40);
    doc.text('your@hostelemail.com', 14, 45);

    const companyDetails = this.getCompanyDetails();
    doc.text('BILLED TO:', 140, 30);
    doc.text(companyDetails.name, 140, 35);
    doc.text(companyDetails.address, 140, 40);
    doc.text(companyDetails.phone, 140, 45);
    doc.text(companyDetails.email, 140, 50);

    const invoiceYStart = 65;
    const invoiceDetails = [
      `Invoice No: 000001`,
      `Account No: 00002324`,
      `Issue Date: ${new Date().toLocaleDateString()}`,
      `Due Date: 01/09/2024`
    ];
    invoiceDetails.forEach((detail, index) => {
      doc.text(detail, 140, invoiceYStart + (index * 5));
    });

    (doc as any).autoTable({
      head: [['Employee Id', 'Name', 'Designation', 'Due', 'TOTAL']],
      body: this.dbEmployeeData.map((employee: any) => [
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

    doc.setFontSize(12);
    let finalY = (doc as any).lastAutoTable.finalY + 10;
    const subTotal = this.totalDue1;
    const tax = subTotal * 0.1; // 10% tax
    const total = subTotal + tax;

    doc.text(`Subtotal: $${subTotal.toFixed(2)}`, 14, finalY);
    doc.text(`Tax (10%): $${tax.toFixed(2)}`, 14, finalY + 5);
    doc.text(`Total: $${total.toFixed(2)}`, 14, finalY + 10);

    // Add Footer
    doc.text('THANK YOU FOR YOUR BUSINESS', 14, finalY + 30);
    doc.text('Invoice Terms: E.g Payment Instructions (Account Number, Bank and Bank Account Holder)', 14, finalY + 35);

    // Save PDF
    doc.save('invoice.pdf');
    this.pdfOutput = doc.output('blob');
    this.sendInvoice(); 
  }

  sendInvoice() {
    this.adminService.sendInvoice(this.pdfOutput, this.email, this.companyName).subscribe(
      response => {
        console.log('Email sent successfully!', response);
        this.snackBar.open('Email sent successfully!', 'Close', {
          duration: 5000,
        });
        this.openDialog();
      },
      error => {
        console.error('Error sending email:', error);
        this.snackBar.open('Error sending email.', 'Close', {
          duration: 5000
        });
      }
    );
  }

  validateNumbers() {
    this.adminService.validateMobileNumbers(this.mobileNumbers).subscribe(
      response => {
        this.existingMobileNumbers = response.existingMobileNumbers;
        this.nonExistingMobileNumbers = response.nonExistingMobileNumbers;

        // Find matched records and store them
        this.matchedData = this.employeeData.filter(emp =>
          this.existingMobileNumbers.includes(emp.Mobile)
        );

        // Find unmatched records and store them
        this.unmatchedData = this.employeeData.filter(emp =>
          !this.existingMobileNumbers.includes(emp.Mobile)
        );

        this.processMatchedData();
      },
      error => {
        this.errorMessage = 'An error occurred while validating mobile numbers.';
      }
    );
  }

  processMatchedData() {
    this.dbEmployeeData = this.matchedData;
    this.calculateTotal(); // Recalculate total after processing matched data
  }

  moveToMatchedData(index: number) {
    const dataToMove = this.unmatchedData.splice(index, 1)[0];
    this.matchedData.push(dataToMove);
    this.dbEmployeeData = this.matchedData;
    this.calculateTotal(); // Recalculate total after moving data
  }

  removeEmployee(index: number) {
    this.dbEmployeeData.splice(index, 1);
    this.calculateTotal(); // Update total due after removal
  }

  getCompanyDetails() {
    switch (this.companyName) {
      case 'Microsoft':
        return {
          name: 'Microsoft',
          address: '1 Microsoft Way, Redmond, WA 98052, USA',
          phone: '123-456-7890',
          email: 'info@microsoft.com'
        };
      case 'Capgemini':
        return {
          name: 'Capgemini',
          address: '11 rue de Tilsitt, 75017 Paris, France',
          phone: '234-567-8901',
          email: 'info@capgemini.com'
        };
      case 'TCS':
        return {
          name: 'TCS',
          address: 'Tata Consultancy Services, Mumbai, India',
          phone: '345-678-9012',
          email: 'info@tcs.com'
        };
      case 'Infosys':
        return {
          name: 'Infosys',
          address: 'Electronics City, Hosur Road, Bengaluru, India',
          phone: '456-789-0123',
          email: 'info@infosys.com'
        };
      default:
        return {
          name: 'Unknown',
          address: 'Unknown',
          phone: 'Unknown',
          email: 'Unknown'
        };
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegistrationSuccessDialogComponent, {
      width: '40%',
      data: { message: 'Invoice has been sent successfully' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/admin-dashboard']);
    });
  }
}
