import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { StockStore } from 'src/app/services/stock/stock.store';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit{
  
  stockForm:FormGroup;
  dissable:boolean = true;
  productCode:number=0;

  constructor(private fb:FormBuilder,private stockStore:StockStore,private router:Router){}
  
  ngOnInit(): void {

    this.stockStore.getNextProductCode().subscribe(data=>{
      this.productCode = data.code;
      console.log("code",data)
      this.stockForm.controls['code'].setValue(data.code);
    })

    this.stockForm = this.fb.group({
      name:['',[Validators.required]],
      buyingPrice:[0],
      sellingPrice:[0,[Validators.required]],
      quantity:[0,[Validators.required]],
      reOrderLevel:[0],
      code:[0,[Validators.required]],
      inStock:[true],
      status:['INSTOCK'],
      isActive:[true],
      unitLiters:[0,[Validators.required]],
      liters:[0],
      strength:[0]
    })

    //this.stockForm.controls['liters'].disable();
    // this.stockForm.get(['unitLiters']).valueChanges.subscribe(val=>{
      // const qty = Math.round((Number(this.stockForm.get('quantity').value) + Number.EPSILON) * 100) / 100 ;
      // this.stockForm.get('liters').patchValue(Math.round((((val/1000)*qty) + Number.EPSILON) * 100) / 100)
    // })

    merge(
      this.stockForm.get('unitLiters').valueChanges,
      this.stockForm.get('quantity').valueChanges,
 ).subscribe(val => {
  console.log("valu",val)
  const qty = Math.round((Number(this.stockForm.get('quantity').value) + Number.EPSILON) * 100) / 100 ;
  console.log("qty:",qty)
  const lit = Math.round((Number(this.stockForm.get('unitLiters').value) + Number.EPSILON) * 100) / 100 ;

  console.log("lit:",lit)
  const tot = Math.round((Number(lit/1000) + Number.EPSILON) * 100) / 100 ;
      this.stockForm.get('liters').patchValue(Math.round(((tot*qty) + Number.EPSILON) * 100) / 100)
 });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.stockForm.controls;
  }

  

  onSubmit(form:FormGroup){
    if(this.stockForm.valid){
      console.log("llliter",form.value)
      this.stockStore.createStock(form.value).subscribe(()=>this.stockForm.reset())
      this.router.navigate(['/protected/stocks'])
    }
  }

  cancel(){
    this.stockForm.reset();
    this.router.navigate(['/protected/stocks'])
  }

}
