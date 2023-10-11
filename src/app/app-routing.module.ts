import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RagisterComponent } from './component/ragister/ragister.component';

const routes: Routes = [
  {path : '', redirectTo : 'login',pathMatch : 'full'},
  {path : 'login', component: LoginComponent},
  {path : 'ragister', component: RagisterComponent},
  {path : 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }