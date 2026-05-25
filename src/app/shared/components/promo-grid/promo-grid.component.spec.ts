import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoGridComponent } from './promo-grid.component';

describe('PromoGridComponent', () => {
  let component: PromoGridComponent;
  let fixture: ComponentFixture<PromoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PromoGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
