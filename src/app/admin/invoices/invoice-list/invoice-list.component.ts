import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';
import { Invoice } from 'src/app/models/invoice.model';
import { Stock } from 'src/app/models/stock.model';
import { User } from 'src/app/models/user.model';
import { AuthStore } from 'src/app/services/auth/auth.store';
import { InvoiceStore } from 'src/app/services/invoice/invoice.store';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit,OnDestroy{
  data:Invoice[];
  statuses: any[];

  loading: boolean = true;

    activityValues: number[] = [0, 100];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  user$:Observable<User>;
  invoices$:Observable<Invoice[]>;
    constructor(private invoiceStore:InvoiceStore,private authStore:AuthStore){}

    ngOnInit(): void {
      this.loading=false;
      this.invoices$ = this.invoiceStore.invoices$
      this.getData();
      this.user$ = this.authStore.user$;
      this.statuses = [
        {label: 'APPROVE', value: "APPROVED"},
        {label: 'PENDING', value: 'PENDING'},
        {label: 'REJECT', value: 'REJECTED'}
      ]
    }

    getData(){
      this.invoiceStore.invoices$.subscribe(data=>{
        this.data = data
        console.log(this.data)
        this.dtTrigger.next(data);
      })
    }
    clear(table: Table) {
      table.clear();
  }
    ngOnDestroy(): void {
      //this.dtTrigger.unsubscribe();
    }
}
