import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRentFormComponent } from './monthly-rent-form.component';

describe('MonthlyRentFormComponent', () => {
  let component: MonthlyRentFormComponent;
  let fixture: ComponentFixture<MonthlyRentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthlyRentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyRentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
