import { Customer } from "./customer.model";

export interface Agent{
    id?:number;
    name:string;
    mobile:string;
    email:string;
    customers?:Customer[];
}