import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Agent } from "src/app/models/agent.model";
import { Customer } from "src/app/models/customer.model";
import { Invoice } from "src/app/models/invoice.model";
import { Stock } from "src/app/models/stock.model";
import { InvoiceStore } from "./invoice.store";

@Injectable({
    providedIn: 'root'
})
export class TempInvoiceStore {

    agent: Agent = {
        id: 0,
        email: '',
        mobile: '',
        name: '',
        customers: []
    }

    customer: Customer = {
        id: 0,
        email: '',
        address1: '',
        isActive: false,
        mobile: '',
        name: '',
    }

    initiateInvoice: Invoice = {
        id: 0,
        agent: this.agent,
        approvedBy: 0,
        customer: this.customer,
        inventories: [],
        isApproved: false,
        number: '',
        reason: '',
        status: '',
        subTotal: 0,
        tax: 0,
        taxAmount: 0,
        invoiceQuantities:[],
        total: 0,
        createDate:new Date(),
        deliveryDate:new Date(),
        updatedDay:new Date()

    }

    private invoiceSubject = new BehaviorSubject<Invoice>(this.initiateInvoice)

    invoice$: Observable<Invoice> = this.invoiceSubject.asObservable();

    constructor(private invoiceStore: InvoiceStore) {

    }


    initInvoice() {
        const invoice = this.invoiceSubject.getValue();
        this.invoiceStore.getSequenceId().subscribe(data => {
            invoice.number = data.sequenceId,
                console.log("invoice number ", data)
            this.invoiceSubject.next(invoice);
        });
    }

    addItem(id: number, stock: Stock) {
        const invoice = this.invoiceSubject.getValue();

        const existingStock: Stock[] = invoice.inventories;
        const exist = existingStock.find(x => x.id == id);
        if (exist) {
            const index = existingStock.findIndex(invoice => invoice.id == id);

            const newInvoice: Stock = existingStock[index]
            newInvoice.invoiceQty++;
            newInvoice.quantity--;
            const newStocks: Stock[] = existingStock.slice(0);
            newStocks[index] = newInvoice;

            invoice.inventories = newStocks;
        }else{
            stock.quantity--;
            invoice.inventories.push(stock);
        }
        this.calTotal(invoice.inventories)
    }

        addAmount(id:number,value:number){
        const invoice = this.invoiceSubject.getValue();

        const existingStock: Stock[] = invoice.inventories;
        const exist = existingStock.find(x => x.id == id);
        if (exist) {
            const index = existingStock.findIndex(stock => stock.id == id);

            const newInvoice: Stock = existingStock[index]
            newInvoice.invoiceQty = value;
            newInvoice.quantity-=value;
            const newStocks: Stock[] = existingStock.slice(0);
            newStocks[index] = newInvoice;

            invoice.inventories = newStocks;
            this.calTotal(invoice.inventories)
        }
        
    }

    removeItem(id:number){
        const invoice = this.invoiceSubject.getValue();

        const existingStock: Stock[] = invoice.inventories;
        const exist = existingStock.filter(x => x.id != id);

        invoice.inventories = exist;
        this.calTotal(invoice.inventories)
    }

    addCustomer(customer:Customer){
        const invoice= this.invoiceSubject.getValue();
        invoice.customer=customer;

        this.invoiceSubject.next(invoice);
    }

    reset(){
        this.invoiceSubject.next(this.initiateInvoice)
    }

    private calTotal(stocks:Stock[]){
        const invoice = this.invoiceSubject.getValue();
        invoice.total=0;
        invoice.subTotal=0;
        invoice.totalLiters= 0;

        for(let i = 0 ;i<stocks.length;i++){
            invoice.subTotal += Math.round((stocks[i].sellingPrice*stocks[i].invoiceQty) * 100) / 100;
            invoice.totalLiters += Math.round((stocks[i].unitLiters*stocks[i].invoiceQty) * 100) / 100;
        }
        
        invoice.tax =Math.round((invoice.subTotal*0.15 ) * 100) / 100; 
        invoice.total = Math.round((invoice.subTotal+invoice.tax) * 100) / 100;
        this.invoiceSubject.next(invoice);
    }
}