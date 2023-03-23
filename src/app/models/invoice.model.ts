
import { Agent } from "./agent.model";
import { Customer } from "./customer.model";
import { InvoiceQty } from "./invoice-qty.model";
import { Stock } from "./stock.model";

export interface Invoice{
    id?:number;
    number:string;
    total:number;
    totalLiters?:number;
    subTotal:number;
    tax:number;
    taxAmount:number;
    isApproved:boolean;
    approvedBy:number;
    reason:string;
    status:string;
    inventories:Stock[];
    invoiceQuantities:InvoiceQty[];
    customer:Customer;
    agent:Agent;
    lorryNo?:string;
    ctsNo?:string;
    createDate:Date;
    deliveryDate :Date;
    updatedDay:Date;
}