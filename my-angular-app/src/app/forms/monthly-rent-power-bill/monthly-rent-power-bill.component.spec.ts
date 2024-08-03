import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRentPowerBillComponent } from './monthly-rent-power-bill.component';

describe('MonthlyRentPowerBillComponent', () => {
  let component: MonthlyRentPowerBillComponent;
  let fixture: ComponentFixture<MonthlyRentPowerBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyRentPowerBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyRentPowerBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
