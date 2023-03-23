import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCreateForApprovalComponent } from './invoice-create-for-approval.component';

describe('InvoiceCreateForApprovalComponent', () => {
  let component: InvoiceCreateForApprovalComponent;
  let fixture: ComponentFixture<InvoiceCreateForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceCreateForApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceCreateForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
