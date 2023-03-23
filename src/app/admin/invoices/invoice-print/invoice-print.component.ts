import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { User } from 'src/app/models/user.model';
import { AuthStore } from 'src/app/services/auth/auth.store';
import { InvoiceStore } from 'src/app/services/invoice/invoice.store';
import { TextTransformPipe } from 'src/app/text.pipe';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.css']
})
export class InvoicePrintComponent implements OnInit{
  
  invoice$:Observable<Invoice>;
  myDate = new Date();
  deliveryDate = new Date();
  datePipe: any;
  lorryNo:string = '';
  ctsNo:string= '';
  checked: boolean = false;

  constructor(private invoiceStore:InvoiceStore,private route:ActivatedRoute,private authStore:AuthStore){
    //this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  }
  lorryList:any[]=[
    {id:1,number:'LO-4872',ctsNo:'802203'},
    {id:2,number:'LO-4881',ctsNo:'802204'},
    {id:3,number:'LO-5760',ctsNo:'802201'},
    {id:4,number:'LO-5761',ctsNo:'802202'},
    {id:5,number:'PY-2396',ctsNo:'802205'}
  ]
  ngOnInit(): void {
    
    this.invoiceStore.getInvoiceById(Number(this.route.snapshot.paramMap.get('id')));
    
    this.invoice$ = this.invoiceStore.invoice$;
    this.invoice$.subscribe(data=> {
      this.deliveryDate = new Date(data.deliveryDate)
      this.myDate = new Date(data.deliveryDate)
    })
  }
  onSeleceted(id:any,invoice:Invoice){
    console.log("iddd: ",id)
    const lorry = this.lorryList.find(e=>e.id==id);
    invoice.lorryNo=lorry.number;
    invoice.ctsNo=lorry.ctsNo;

    this.lorryNo = lorry.number;
    this.ctsNo = lorry.ctsNo;
    this.invoiceStore.addLorry(invoice.id,invoice);
  }

  updateInvoice(invoice:Invoice){
    console.log("delivery Date : ",this.deliveryDate)
    invoice.deliveryDate = this.deliveryDate;
    this.invoiceStore.updateDeliveryDate(invoice).subscribe();
  }
}
