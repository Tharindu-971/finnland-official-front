import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { Stock } from "src/app/models/stock.model";
import { environment } from "src/environments/environment";
import { LoadingService } from "../loading/loading.service";

@Injectable({
    providedIn: 'root'
})
export class StockStore {
    private subject = new BehaviorSubject<Stock[]>([])

    stocks$: Observable<Stock[]> = this.subject.asObservable();

    private searchSubject = new BehaviorSubject<Stock[]>([])

    filteredStocks$: Observable<Stock[]> = this.searchSubject.asObservable();

    constructor(private http: HttpClient, private toastr: ToastrService, private loadingService: LoadingService) {
        this.loadStocks()
    }

    private loadStocks() {
        const loadStocks$ = this.http.get<Stock[]>(`${environment.apiUrl}/inventories`)
            .pipe(
                map(response => response),
                catchError(err => {
                    const message = "Could not load stocks";
                    this.toastr.error(message);
                    console.log("StockStore:loadStocks", err)
                    return throwError(err)
                }),
                tap(stocks =>this.subject.next(stocks))
            )

        this.loadingService.showLoaderUntillCompleted(loadStocks$).subscribe();
    }

    createStock(stock: Stock): Observable<any> {
        const stocks = this.subject.getValue();
        stocks.push(stock);
        console.log("res ",stock)
        this.subject.next(stocks);
        return this.http.post<any>(`${environment.apiUrl}/inventories`, stock)
            .pipe(
                map(response => {
                    if (response) {
                        console.log("res ",response)
                        this.toastr.success("Stock Created Successfully")
                    } else {
                        this.toastr.warning("Could not Create Stock")
                    }
                }
                ),
                catchError(err => {
                    this.toastr.error("Could not Create Stock");
                    console.log("StockStore:createStock", err)
                    return throwError(err)
                })
            )
    }

    updateStock(id: number, stock: Partial<Stock>): Observable<any> {
        const stocks = this.subject.getValue();
        const index = stocks.findIndex(stock => stock.id == id);

        const newCustomer: Stock = {
            ...stocks[index],
            ...stock
        }
        const newStocks: Stock[] = stocks.slice(0);
        newStocks[index] = newCustomer;
        this.subject.next(newStocks);

        return this.http.put<any>(`${environment.apiUrl}/inventories/${id}`, stock)
            .pipe(
                map(response => {

                    if (response) {

                        if (response.statusCodeValue == 200) {
                            this.toastr.success("Stock Created Successfully")
                        } else {
                            this.toastr.info("Stock Update Successfully")
                        }
                    }

                }),
                catchError(err => {
                    this.toastr.error("Could not Update Stock");
                    console.log("StockStore:stockUpdate", err)
                    return throwError(err)
                })
            )
    }

    deleteStock(id: number): Observable<any> {
        const stocks = this.subject.getValue();
        const updatedCustomers: Stock[] = stocks.filter(stock => stock.id != id);

        this.subject.next(updatedCustomers);

        return this.http.delete<any>(`${environment.apiUrl}/inventories/${id}`)
            .pipe(
                map(response => {
                    if (response.statusCodeValue == 204) {
                        this.toastr.success("Stock Deleted Successfully")
                    } else {
                        this.toastr.warning("Could not Delete Stock")
                    }
                }),
                catchError(err => {
                    this.toastr.error("Could not Delete Stock");
                    console.log("StockStore:deleteStock", err)
                    return throwError(err)
                })
            )
    }

    getStockById(id:number):Stock {
        
        const stocks = this.subject.getValue();
        console.log("stockesss : ",stocks)
        if(!(stocks.length>0)){
            this.loadStocks();
            console.log("ssss",this.subject.getValue())
        }
        const index = stocks.findIndex(s=>s.id===id);
        const stock:Stock = stocks[index];
        console.log("Stock : ", stock)
        return stock;

    }
    searchStock(value:string){
        
        const stocks = this.subject.getValue();
        const filteredStock = stocks.filter(key=>key.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        console.log(filteredStock)
        this.searchSubject.next(filteredStock);
    }

    getNextProductCode():Observable<any>{
        const loadCode$ = this.http.get<any>(`${environment.apiUrl}/inventories/code`)
            .pipe(
                map(response => response),
                catchError(err => {
                    const message = "Could not load stocks";
                    this.toastr.error(message);
                    console.log("StockStore:loadStocks", err)
                    return throwError(err)
                }),
                
            )

        return loadCode$;
    }

    clearSeach(){this.searchSubject.next([])}
}