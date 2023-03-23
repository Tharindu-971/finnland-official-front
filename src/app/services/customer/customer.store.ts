import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, catchError, throwError, map, tap } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerStore {

  private subject = new BehaviorSubject<Customer[]>([]);

  customers$: Observable<Customer[]> = this.subject.asObservable();

  private searchSubject = new BehaviorSubject<Customer[]>([])

  filteredCustomers$: Observable<Customer[]> = this.searchSubject.asObservable();

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {
    this.loadCustomers();
  }

  private loadCustomers() {
    const loadCustomers$ = this.http.get<Customer[]>(`${environment.apiUrl}/customers`)
      .pipe(
        map(response => { console.log(response);return response; }),
        
        catchError(err => {
          const message = "Could not load customers";
          this.toastr.error(message);
          console.log("CustomerStore:loadCustomer", err)
          return throwError(err)
        }),
        tap(customers => this.subject.next(customers))
      )

    this.loadingService.showLoaderUntillCompleted(loadCustomers$).subscribe();
  }

  getAllCustomers(){
    return this.http.get<Customer[]>(`${environment.apiUrl}/customers`).subscribe(data => data);
  }

  createCustomer(customer:Customer):Observable<any>{
    const customers = this.subject.getValue();
    customers.push(customer);
    this.subject.next(customers);
    return this.http.post<any>(`${environment.apiUrl}/customers`,customer)
      .pipe(
        map(response=>{
          if(response){
              this.toastr.success("Customer Created Successfully")
              this.loadCustomers();
            }else{
              this.toastr.warning("Could not Create Customer")
            }
          }
        ),
        catchError(err=>{
          this.toastr.error("Could not Create Customer");
          console.log("CustomerStore:createCustomer",err)
          return throwError(err)
        })
      )
  }

  updateCustmer(id:number,customer:Partial<Customer>):Observable<any>{
    const customers = this.subject.getValue();
    const index = customers.findIndex(customer=>customer.id == id);

    const newCustomer:Customer ={
      ...customers[index],
      ...customer
    } 
    const newCustomers :Customer[]=customers.slice(0);
    newCustomers[index] = newCustomer;
    this.subject.next(newCustomers);

    return this.http.put<any>(`${environment.apiUrl}/customers/${id}`,customer)
    .pipe(
      map(response =>{
        
        if(response){
          
          if(response.statusCodeValue ==200){
            this.toastr.success("Customer Created Successfully")
          }else{
            this.toastr.warning("Could not Create Customer")
          }
        }
        
      }),
      catchError(err=>{
        this.toastr.error("Could not Update Customer");
        console.log("CustomerStore:customerUpdate",err)
        return throwError(err)
      })
    )
  }

  deleteCustmer(id:number):Observable<any>{
    const customers = this.subject.getValue();
    const updatedCustomers:Customer[] = customers.filter(customer=>customer.id != id);

    this.subject.next(updatedCustomers);

    return this.http.delete<any>(`${environment.apiUrl}/customers/${id}`)
    .pipe(
      map(response =>{
        if(response.statusCodeValue ==204){
          this.toastr.success("Customer Deleted Successfully")
        }else{
          this.toastr.warning("Could not Delete Customer")
        }
      }),
      catchError(err=>{
        this.toastr.error("Could not Delete Customer");
        console.log("CustomerStore:deleteCustomer",err)
        return throwError(err)
      })
    )
  }

  searchCustomer(value:string){
        
    const customers = this.subject.getValue();
    const filteredCustomers = customers.filter(key=>key.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))

    this.searchSubject.next(filteredCustomers);
}

clearCustomer(){
  this.searchSubject.next([])
}

}
