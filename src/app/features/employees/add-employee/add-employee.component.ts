import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '../../../shared/models/department';
import { Employee, Gender, Status } from '../../../shared/models/employee';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DepartmentService } from '../../../core/services/department/department.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  standalone: false,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;
  mode: 'Add' | 'Edit' = 'Add';
  departmentList: Department[] = [];
  employee?: Employee;

  genders = Object.values(Gender);
  statuses = Object.values(Status);

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data?.mode || 'Add';
    this.employee = data?.employee;
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.initForm();
  }

  loadDepartments() {
    this.departmentService.getAllDepartments().subscribe({
      next: (res) => (this.departmentList = res),
      error: () =>
        this.snackBar.open('Failed to load departments', 'Close', {
          duration: 3000,
        }),
    });
  }

  initForm() {
    this.employeeForm = this.fb.group({
      name: [this.employee?.name || '', Validators.required],
      designation: [this.employee?.designation || '', Validators.required],
      phoneNumber: [this.employee?.phoneNumber || '', [Validators.required]],
      gender: [this.employee?.gender || '', Validators.required],
      status: [this.employee?.status || '', Validators.required],
      departmentId: [this.employee?.department?.id || '', Validators.required],
      address: this.fb.group({
        landMark: [this.employee?.address?.landMark || '', Validators.required],
        address1: [this.employee?.address?.address1 || '', Validators.required],
        address2: [this.employee?.address?.address2 || ''],
        city: [this.employee?.address?.city || '', Validators.required],
        state: [this.employee?.address?.state || '', Validators.required],
        country: [this.employee?.address?.country || '', Validators.required],
        pin: [
          this.employee?.address?.pin || '',
          [Validators.required, Validators.pattern(/^\d{6}$/)],
        ],
      }),
    });
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    const formValue = this.employeeForm.value;

    const payload: Employee = {
      ...formValue,
      department: { id: formValue.departmentId },
    };

    if (this.mode === 'Add') {
      this.employeeService.registerEmployee(payload).subscribe({
        next: () => {
          this.snackBar.open('Employee added successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: () =>
          this.snackBar.open('Failed to add employee', 'Close', {
            duration: 3000,
          }),
      });
    } else {
      payload.id = this.employee?.id;

      payload.employeeId = this.employee?.employeeId;
      payload.active = this.employee?.active;

      this.employeeService.updateEmployee(payload).subscribe({
        next: () => {
          this.snackBar.open('Employee updated successfully', 'Close', {
            duration: 3000,
          });
          this.dialogRef.close(true);
        },
        error: () =>
          this.snackBar.open('Failed to update employee', 'Close', {
            duration: 3000,
          }),
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
