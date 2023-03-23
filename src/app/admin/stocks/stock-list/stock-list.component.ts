import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { Stock } from 'src/app/models/stock.model';
import { StockStore } from 'src/app/services/stock/stock.store';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit, OnDestroy{
  data:Stock[];

  statuses: any[];

  loading: boolean = true;

    activityValues: number[] = [0, 100];


    

  values:string[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private stockStore:StockStore){
  }
  ngOnInit(): void {
    this.loading = false;
    this.getData();
    this.statuses = [
      {label: 'INSTOCK', value: 'INSTOCK'},
      {label: 'OUTOFSTOCK', value: 'OUTOFSTOCK'}
  ]
  }
  
  clear(table: Table) {
    table.clear();
}

  getData(){
    this.stockStore.stocks$.subscribe(data=>{
      this.data = data
      this.dtTrigger.next(data);
    })
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();

  }


  
}
