import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelMembersDashboardComponent } from './hostel-members-dashboard.component';

describe('HostelMembersDashboardComponent', () => {
  let component: HostelMembersDashboardComponent;
  let fixture: ComponentFixture<HostelMembersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostelMembersDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostelMembersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
