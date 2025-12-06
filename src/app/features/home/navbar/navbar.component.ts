import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { AddDepartmentComponent } from '../../departments/add-department/add-department.component';
import { AddEmployeeComponent } from '../../employees/add-employee/add-employee.component';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDashboard: boolean = false;
  isDepartmentSection: boolean = false;
  isDashboardEmployeeSection: boolean = false;
  constructor(private router: Router,
    private dialog: MatDialog
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isDashboard = event.url.includes('/dashboard');
        this.isDepartmentSection = event.url.includes('/departments');
        this.isDashboardEmployeeSection = event.url.includes('/employees');
      });
  }

  saveDepatrtment() {
    this.dialog.open(AddDepartmentComponent, {
      maxHeight: '80vh',
      maxWidth: '600px',
      width: '100%',
      data: {mode: 'Add'}
    }).afterClosed().subscribe();
  }

  saveEmployee() {
    this.dialog.open(AddEmployeeComponent, {
      maxHeight: '100vh',
      maxWidth: '1100px',
      width: '100%',
      data: {mode: 'Add'}
    }).afterClosed().subscribe();
  }
}
