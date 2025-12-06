import { Component, ViewChild } from '@angular/core';
import { DepartmentService } from '../../../core/services/department/department.service';
import { ToastrService } from 'ngx-toastr';
import { Department } from '../../../shared/models/department';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-department',
  standalone: false,
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
})
export class DepartmentComponent {
  dataSource = new MatTableDataSource<Department>([]);
  displayedColumns: string[] = ['id', 'name', 'code', 'description', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private departmentService: DepartmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
    this.departmentService.refresh$.subscribe(() => {
      this.loadDepartments();
    });
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe({
      next: (dept) => {
        this.dataSource.data = dept;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        this.snackBar.open('Failed to load departments', 'Close', {
          duration: 3000,
        });
      },
    });
  }

  editDepartment(department: Department) {
    this.dialog
      .open(AddDepartmentComponent, {
        maxHeight: '80vh',
        maxWidth: '600px',
        width: '100%',
        data: { mode: 'Edit', department: department },
      })
      .afterClosed()
      .subscribe();
  }

  
  deleteDepartment(departmentId: number) {
    const snackRef = this.snackBar.open(
      'Are you sure you want to delete this department?',
      'Yes',
      {
        duration: 5000, 
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );

    snackRef.onAction().subscribe(() => {
      this.departmentService.deleteDepartment(departmentId).subscribe({
        next: () => {
          this.snackBar.open('Department deleted successfully', 'Dismiss', {
            duration: 3000,
          });
          this.loadDepartments();
        },
        error: () => {
          this.snackBar.open('Failed to delete the department', 'Close', {
            duration: 3000,
          });
        },
      });
    });
  } 
}
