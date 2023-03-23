import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Invoice } from 'src/app/models/invoice.model';
import { Stock } from 'src/app/models/stock.model';
import { CustomerStore } from 'src/app/services/customer/customer.store';
import { InvoiceStore } from 'src/app/services/invoice/invoice.store';
import { TempInvoiceStore } from 'src/app/services/invoice/temp-invoice.store';
import { StockStore } from 'src/app/services/stock/stock.store';
import { nonZeroValidator } from 'src/app/validators/non-zero.validator';

interface InvoiceData{
  stocks:Stock[],
  invoices:Invoice,
}

@Component({
  selector: 'app-invoice-create-for-approval',
  templateUrl: './invoice-create-for-approval.component.html',
  styleUrls: ['./invoice-create-for-approval.component.css']
})
export class InvoiceCreateForApprovalComponent implements OnInit{

  filterStocks$:Observable<Stock[]>;

  filterCustomers$:Observable<Customer[]>;

  invoice$:Observable<Invoice>;

  invoiceForm:FormGroup;
  stockForm:FormGroup;

  myDate = new Date();
  
  constructor(private invoiceStore:InvoiceStore,
    private stockStore:StockStore,
    private router:Router,
    private tempInvoiceStore : TempInvoiceStore,
    private customerStore:CustomerStore,
    private fb:FormBuilder){}

  ngOnInit(): void {
    this.filterStocks$ = this.stockStore.filteredStocks$;

    this.filterCustomers$ = this.customerStore.filteredCustomers$;

    this.invoice$ = this.tempInvoiceStore.invoice$;

    this.tempInvoiceStore.initInvoice();

    this.invoiceForm = this.fb.group({
      number:[0,[Validators.required]],
      total:[0,[Validators.required,nonZeroValidator]],
      subTotal:[0,[Validators.required,nonZeroValidator]],
      tax:[0,[Validators.required,nonZeroValidator]],
      taxAmount:[0,[Validators.required,nonZeroValidator]],
      isApproved:[false],
      inventories:this.fb.array([]),
      customer:this.fb.group({
        id:[0,[Validators.required]],
        name:['',[Validators.required]],
        mobile:['',[Validators.required]],
        address1:['',[Validators.required]],
        address2:['']
      }),
      agent:this.fb.group({
        id:[0,[Validators.required]],
        agentName:['',[Validators.required]],
        agentMobile:['',[Validators.required]],
        address1:['',[Validators.required]],
        agentEmail:[''],
        customers:this.fb.array([])
      })
    })


    this.fb.group({
      name:['',[Validators.required]],
      buyingPrice:[0,[Validators.required]],
      sellingPrice:[0,[Validators.required]],
      quantity:[0,[Validators.required]],
      reOrderLevel:[0],
      inStock:[false],
      status:[''],
      isActive:[false],
      unitLiters:[0,[Validators.required]],
      liters:[0]
    });

  }

  get inventories() {
    return this.invoiceForm.controls["inventories"] as FormArray;
  }

  searchProduct(value:string){
    console.log(value)
    this.stockStore.searchStock(value);
  }

  addToCart(event:any){
    //stock.invoiceQty=1;
    let stock :Stock = event as Stock;
    stock.invoiceQty =1;
    
    this.tempInvoiceStore.addItem(stock.id,stock)
    
    this.stockStore.clearSeach()
  }

  addAmount(id:number,value:string){
    
    this.tempInvoiceStore.addAmount(id,Math.round((Number(value)) * 100) / 100)
    
    this.stockStore.clearSeach()
  }

  removeItem(id:number){
    this.tempInvoiceStore.removeItem(id);
  }

  searchCustomer(value:string){
    this.customerStore.searchCustomer(value);
  }

  addCustomer(event:any){
    console.log("customer: ",event as Customer)
    this.tempInvoiceStore.addCustomer(event as Customer)
    this.customerStore.clearCustomer()
  }

  submit(invoice:Invoice){
    invoice.status="PENDING"
    invoice.createDate = this.myDate;
    invoice.updatedDay = this.myDate;
    invoice.deliveryDate = this.myDate;
    invoice.subTotal = Math.round((invoice.subTotal) * 100) / 100;
    this.invoiceStore.createInvoice(invoice).subscribe(()=>this.tempInvoiceStore.reset())
    this.router.navigate(['/protected/invoices/'])
    
  }














  val: Stock;
  val2: Customer;

    results: Stock[];

    search(event) {
        this.stockStore.searchStock(event.query);
    }
    search2(event) {
        this.customerStore.searchCustomer(event.query);
    }

}
