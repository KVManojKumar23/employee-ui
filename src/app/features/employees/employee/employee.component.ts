import { Component, ViewChild } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Employee } from '../../../shared/models/employee';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Address } from '../../../shared/models/address';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ViewAddressComponent } from '../view-address/view-address.component';

@Component({
  selector: 'app-employee',
  standalone: false,
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  dataSource = new MatTableDataSource<Employee>([]);
  displayedColumns = [
    'slno',
    'employeeId',
    'name',
    'designation',
    'phoneNumber',
    'gender',
    'status',
    'department',
    'actions',
  ];

  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.employeeService.refresh$.subscribe(() => {
      this.loadEmployees();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (employee) => {
        this.isLoading = false;
        this.dataSource.data = employee;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        this.snackBar.open('Failed to load employees', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  editEmployee(employee: Employee) {
    this.dialog.open(AddEmployeeComponent, {
      maxHeight: '100vh',
      maxWidth: '1100px',
      width: '100%',
      data: { mode: 'Edit', employee: employee },
    }).afterClosed().subscribe();
  }

  deleteEmployee(employeeId: number) {
    const snackRef = this.snackBar.open(
      'Are you sure you want to delete this employee?',
      'Yes',
      {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
    snackRef.onAction().subscribe(() => {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          this.snackBar.open('Employee deleted successfully', 'Dismiss', {
            duration: 3000,
          });
          this.loadEmployees();
        },
        error: () => {
          this.snackBar.open('Failed to delete the employee', 'Close', {
            duration: 3000,
          });
        },
      });
    });
  }

  viewAddress(address: Address) {
    this.dialog.open(ViewAddressComponent, {
      maxHeight: '80vh',
      maxWidth: '600px',
      width: '100%',
      data: { address: address },
    }).afterClosed().subscribe();
  }


}
