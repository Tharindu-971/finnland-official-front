import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { User } from 'src/app/models/user.model';
import { AuthStore } from 'src/app/services/auth/auth.store';
import { InvoiceStore } from 'src/app/services/invoice/invoice.store';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css']
})
export class ViewInvoiceComponent {
  user$:Observable<User>;
  invoice$:Observable<Invoice>;
  myDate = new Date();
  deliveryDate = new Date();
  datePipe: any;

  constructor(private invoiceStore:InvoiceStore,private route:ActivatedRoute,private authStore:AuthStore){
    //this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  ngOnInit(): void {
    this.user$ = this.authStore.user$;
    this.invoiceStore.getInvoiceById(Number(this.route.snapshot.paramMap.get('id')));
    this.invoice$ = this.invoiceStore.invoice$;
    let va;
    this.invoice$.subscribe(data=>{va=data
    this.deliveryDate = new Date(data.deliveryDate)
    this.myDate = new Date(data.deliveryDate)
  });
    console.log("view:",va)
  }
}
