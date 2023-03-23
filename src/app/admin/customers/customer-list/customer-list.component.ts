import { Component, OnDestroy, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable, Subject } from 'rxjs';
import { Agent } from 'src/app/models/agent.model';
import { Customer } from 'src/app/models/customer.model';
import { AgentStore } from 'src/app/services/agent/agent.store';
import { CustomerStore } from 'src/app/services/customer/customer.store';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{
  customers$:Observable<Customer[]>;
  agents$:Observable<Agent[]>;
  loading: boolean = true;
  agents:Agent[]=[];
  representatives:Agent[]=[];

  ngOnInit(): void {
    this.customers$ = this.customerStore.customers$;
    this.loading=false;
    this.getAgents();
  }

  getAgents(){
    this.agentStore.agents$.subscribe(data =>{
      
        this.agents = data;
      
    })
  }
  
  

  constructor(private customerStore:CustomerStore,private agentStore:AgentStore){}

  clear(table: Table) {
    table.clear();
}
    
}
