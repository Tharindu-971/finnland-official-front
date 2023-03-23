import { Agent } from "./agent.model";


export interface Customer{
    id?:number;
    name:string;
    mobile:string;
    email:string;
    vatNo?:string;
    address1:string;
    address2?:string;
    isActive:boolean;
    agent?:Agent;
}