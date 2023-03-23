import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentStore } from 'src/app/services/agent/agent.store';

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.css']
})
export class AgentCreateComponent implements OnInit {
  agentForm:FormGroup;
  constructor(private fb:FormBuilder,private agentStore:AgentStore,private router:Router) { }

  ngOnInit(): void {
    this.agentForm = this.fb.group({
      name:['',[Validators.required]],
      mobile:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('^[0-9]+')]],
      email:['',[Validators.email]],
      isActive:[true]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.agentForm.controls;
  }

  onSubmit(form:FormGroup){
    if(this.agentForm.valid){
      this.agentStore.createAgent(form.value).subscribe(()=>this.agentForm.reset());
      this.router.navigate(['/protected/customers/create'])
    }
  }
  cancel(){
    this.agentForm.reset();
    this.router.navigate(['/protected/customers/create'])
  }

}
