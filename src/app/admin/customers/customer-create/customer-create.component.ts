import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Agent } from 'src/app/models/agent.model';
import { AgentStore } from 'src/app/services/agent/agent.store';
import { CustomerStore } from 'src/app/services/customer/customer.store';
import { mobileValidate } from 'src/app/validators/mobile.validator';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {
  customerForm:FormGroup;
  agents:Agent[]=[];
  agents$:Observable<Agent[]>;

  constructor(private fb:FormBuilder,private customerStore:CustomerStore,private agentStore: AgentStore,private router:Router){

  }
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name:['',[Validators.required]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+')],],
      email:['',[Validators.email]],
      vatNo:[''],
      address1:['',[Validators.required]],
      address2:[''],
      agentId:[''],
      isActive:[true]
    })
    this.getAgents()
    console.log("customer form",this.customerForm)
  }

  changeAgent(e) {
    console.log(e.value)
    this.f['agentId'].patchValue( Number(e.target.value));
    console.log('customer form  :::',this.customerForm.value)
  }
  getAgents(){
    this.agentStore.agents$.subscribe(data =>{
      console.log("ddddd",data)
        this.agents = data;
      
    })
  }
  get f(): { [key: string]: AbstractControl } {
    console.log("eeee",this.customerForm.get('mobile').errors);
    return this.customerForm.controls;
  }

  get mobile() {
    return this.customerForm.get('mobile');
  }

  onSubmit(form:FormGroup){
    if(this.customerForm.valid){
      this.customerStore.createCustomer(form.value).subscribe(()=>this.customerForm.reset());
    }
    this.router.navigate(['/protected/customers'])
  }
  cancel(){
    this.customerForm.reset();
    this.router.navigate(['/protected/customers'])
  }

}
