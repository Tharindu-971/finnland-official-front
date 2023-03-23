import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthStore } from '../services/auth/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private fb:FormBuilder,
    private authStore:AuthStore,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  //get form controll
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  onSubmit(){

    const val = this.loginForm.value;

    this.authStore.login(val.email,val.password).subscribe((res:any)=>{
      if(res.statusCodeValue ==401){
        this.toastr.warning('Email or Password Incorrect')
      }else if(res.statusCodeValue == 200){
        this.toastr.success("Login successfull")
        this.router.navigate(['/protected/invoices'])
      }
      
    },
    (error)=>{
      console.log(error)
      this.toastr.error('Internal Server Error Please Try Later')
    }
    )


  }

}
