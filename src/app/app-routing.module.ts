import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { StudentComponent } from './component/student/student.component';
import { TeacherComponent } from './component/teacher/teacher.component';

const routes: Routes = [
  {path : '', redirectTo : 'login',pathMatch : 'full'},
  {path : 'login', component: LoginComponent},
  {path : 'dashboard', component: DashboardComponent},
  {path : 'student', component: StudentComponent},
  {path : 'teacher', component: TeacherComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
