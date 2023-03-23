import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path: 'login',component:LoginComponent},
  {
    path: 'protected',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule)
  },
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
