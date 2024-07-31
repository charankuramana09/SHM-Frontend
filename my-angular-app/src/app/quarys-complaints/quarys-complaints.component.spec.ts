import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarysComplaintsComponent } from './quarys-complaints.component';

describe('QuarysComplaintsComponent', () => {
  let component: QuarysComplaintsComponent;
  let fixture: ComponentFixture<QuarysComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuarysComplaintsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuarysComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
