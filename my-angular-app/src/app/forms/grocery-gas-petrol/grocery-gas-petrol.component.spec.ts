import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryGasPetrolComponent } from './grocery-gas-petrol.component';

describe('GroceryGasPetrolComponent', () => {
  let component: GroceryGasPetrolComponent;
  let fixture: ComponentFixture<GroceryGasPetrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroceryGasPetrolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroceryGasPetrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
