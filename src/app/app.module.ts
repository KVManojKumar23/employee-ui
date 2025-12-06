import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routing
import { AppRoutingModule } from './app-routing.module';

// App Component
import { AppComponent } from './app.component';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

// Toastr
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './features/home/home/home.component';
import { NavbarComponent } from './features/home/navbar/navbar.component';
import { LayoutComponent } from './features/home/layout/layout.component';
import { SideNavbarComponent } from './features/home/side-navbar/side-navbar.component';
import { EmployeeComponent } from './features/employees/employee/employee.component';
import { DepartmentComponent } from './features/departments/department/department.component';
import { AddDepartmentComponent } from './features/departments/add-department/add-department.component';
import { AddEmployeeComponent } from './features/employees/add-employee/add-employee.component';
import { ViewAddressComponent } from './features/employees/view-address/view-address.component';
import { HomeDashboardComponent } from './features/home/home-dashboard/home-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LayoutComponent,
    SideNavbarComponent,
    EmployeeComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    AddEmployeeComponent,
    ViewAddressComponent,
    HomeDashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Angular Material
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatSortModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTooltipModule,

    // Toastr
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
