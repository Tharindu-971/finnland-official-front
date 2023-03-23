import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AgentComponent } from './agent/agent.component';
import { AgentCreateComponent } from './agent/agent-create/agent-create.component';
import { AgentListComponent } from './agent/agent-list/agent-list.component';
import { HeaderComponent } from '../common/header/header.component';
import { SideBarComponent } from '../common/side-bar/side-bar.component';
import { ToastrModule } from 'ngx-toastr';
import { CustomersComponent } from './customers/customers.component';
import { CustomerCreateComponent } from './customers/customer-create/customer-create.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StocksComponent } from './stocks/stocks.component';
import { StockCreateComponent } from './stocks/stock-create/stock-create.component';
import { StockListComponent } from './stocks/stock-list/stock-list.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoiceCreateForApprovalComponent } from './invoices/invoice-create-for-approval/invoice-create-for-approval.component';
import { InvoiceListComponent } from './invoices/invoice-list/invoice-list.component';
import { InvoiceReviewedListComponent } from './invoices/invoice-reviewed-list/invoice-reviewed-list.component';
import { InvoiceApproveComponent } from './invoices/invoice-approve/invoice-approve.component';
import { InvoicePrintComponent } from './invoices/invoice-print/invoice-print.component';
import { NgxPrintModule } from 'ngx-print';
import {DataTablesModule} from 'angular-datatables';


import {ChipsModule} from 'primeng/chips';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { ViewInvoiceComponent } from './invoices/view-invoice/view-invoice.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { TextTransformPipe } from '../text.pipe';
import {CheckboxModule} from 'primeng/checkbox';
import { StockUpdateComponent } from './stocks/stock-update/stock-update.component';


@NgModule({
  declarations: [
    AdminComponent,
    AgentComponent,
    AgentCreateComponent,
    AgentListComponent,
    HeaderComponent,
    SideBarComponent,
    CustomersComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    StocksComponent,
    StockCreateComponent,
    StockListComponent,
    InvoicesComponent,
    InvoiceCreateForApprovalComponent,
    InvoiceListComponent,
    InvoiceReviewedListComponent,
    InvoiceApproveComponent,
    InvoicePrintComponent,
    ViewInvoiceComponent,
    TextTransformPipe,
    StockUpdateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule,
    DataTablesModule,
    CheckboxModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
    AutoCompleteModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    ChipsModule,
    ToastrModule.forRoot()
  ]
})
export class AdminModule { }
