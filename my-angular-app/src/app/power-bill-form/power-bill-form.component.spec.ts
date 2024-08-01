import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerBillFormComponent } from './power-bill-form.component';

describe('PowerBillFormComponent', () => {
  let component: PowerBillFormComponent;
  let fixture: ComponentFixture<PowerBillFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PowerBillFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PowerBillFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
