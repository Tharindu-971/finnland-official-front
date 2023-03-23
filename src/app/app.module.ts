import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './common/loading/loading.component';
import { LoadingService } from './services/loading/loading.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './interceptor/auth.interceptor';
import { JwtModule } from "@auth0/angular-jwt";
import { NgxPrintModule } from 'ngx-print';
import {DataTablesModule} from 'angular-datatables';
import { SuspendedComponent } from './suspended/suspended.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    SuspendedComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPrintModule,
    DataTablesModule,
    ToastrModule.forRoot(),
     JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('access_token')
      }
    })],
  providers:[authInterceptorProviders,LoadingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
