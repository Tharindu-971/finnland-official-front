import { Stock } from "./stock.model";

export interface InvoiceQty{
    id: number;
    invoiceQuantity:number;
    approvedQuantity:number;
    status: boolean,
    inventory: Stock;
}