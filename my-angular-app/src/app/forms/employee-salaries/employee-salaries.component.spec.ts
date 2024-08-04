import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSalariesComponent } from './employee-salaries.component';

describe('EmployeeSalariesComponent', () => {
  let component: EmployeeSalariesComponent;
  let fixture: ComponentFixture<EmployeeSalariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeSalariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
