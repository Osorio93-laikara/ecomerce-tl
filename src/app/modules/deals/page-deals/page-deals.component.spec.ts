import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDealsComponent } from './page-deals.component';

describe('PageDealsComponent', () => {
  let component: PageDealsComponent;
  let fixture: ComponentFixture<PageDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDealsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
