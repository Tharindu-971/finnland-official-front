import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { AuthStore } from 'src/app/services/auth/auth.store';
import { InvoiceStore } from 'src/app/services/invoice/invoice.store';

@Component({
  selector: 'app-invoice-approve',
  templateUrl: './invoice-approve.component.html',
  styleUrls: ['./invoice-approve.component.css']
})
export class InvoiceApproveComponent implements OnInit{

  invoice$:Observable<Invoice>;
  userId:number;
  myDate = new Date();
  deliveryDate = new Date();
  constructor(private invoiceStore:InvoiceStore,
    private route:ActivatedRoute,
    private router : Router,
    private authStore:AuthStore){}

  ngOnInit(): void {
    
    this.invoiceStore.getInvoiceById(Number(this.route.snapshot.paramMap.get('id')));
    this.invoice$ = this.invoiceStore.invoice$;

    this.authStore.user$.subscribe(data => this.userId=data.id)

  }

  addApprovedAmount(invoId:number,qtyId:number,amount:string){
    this.invoiceStore.addApprovedAmount(invoId,qtyId,Number(amount))
  }

  addReason(value:string,invoice:Invoice){
    invoice.reason =value; 
    
    console.log("reason :",invoice)
    this.invoiceStore.addReason(invoice.id,invoice);
  }
  submit(id:number){
    
    this.invoiceStore.approveInvoice(id,this.userId,true).subscribe();
    this.router.navigate(['/protected/invoices'])
  }

  reject(id:number){
    
    this.invoiceStore.approveInvoice(id,this.userId,false).subscribe();
    this.router.navigate(['/protected/invoices'])
  }




}
