import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceReviewedListComponent } from './invoice-reviewed-list.component';

describe('InvoiceReviewedListComponent', () => {
  let component: InvoiceReviewedListComponent;
  let fixture: ComponentFixture<InvoiceReviewedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceReviewedListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceReviewedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
