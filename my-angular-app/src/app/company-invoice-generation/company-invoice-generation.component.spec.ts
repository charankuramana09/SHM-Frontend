import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInvoiceGenerationComponent } from './company-invoice-generation.component';

describe('CompanyInvoiceGenerationComponent', () => {
  let component: CompanyInvoiceGenerationComponent;
  let fixture: ComponentFixture<CompanyInvoiceGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyInvoiceGenerationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyInvoiceGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
