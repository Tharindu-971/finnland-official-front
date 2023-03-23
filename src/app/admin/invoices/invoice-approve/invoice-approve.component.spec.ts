import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceApproveComponent } from './invoice-approve.component';

describe('InvoiceApproveComponent', () => {
  let component: InvoiceApproveComponent;
  let fixture: ComponentFixture<InvoiceApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
