import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LayoutComponent } from './features/home/layout/layout.component';
import { EmployeeComponent } from './features/employees/employee/employee.component';
import { DepartmentComponent } from './features/departments/department/department.component';
import { HomeDashboardComponent } from './features/home/home-dashboard/home-dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeDashboardComponent },
      { path: 'employees', component: EmployeeComponent },
      { path: 'departments', component: DepartmentComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
