import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DepartmentService } from '../../../core/services/department/department.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Code, Department } from '../../../shared/models/department';

@Component({
  selector: 'app-add-department',
  standalone: false,
  templateUrl: './add-department.component.html',
  styleUrl: './add-department.component.css'
})
export class AddDepartmentComponent {

  form!: FormGroup;
  mode: 'Add' | 'Edit' = 'Add';
  department?: Department;
  codes = Object.values(Code);
  
  constructor(private dialogRef: MatDialogRef<AddDepartmentComponent>,
    private departmentService: DepartmentService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.mode = data?.mode || 'Add';
    this.department = data?.department;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.department ? this.department.name : '', Validators.required],
      code: [this.department ? this.department.code : '', Validators.required],
      description: [this.department ? this.department.description : '']
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const deptData: Department = this.form.value;

    if (this.mode === 'Add') {
      this.departmentService.addDepartment(deptData).subscribe({
        next: (res) => {
          this.snackBar.open('Department added successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open('Failed to add department', 'Close', { duration: 3000 });
        }
      });
    } else if (this.mode === 'Edit' && this.department) {
      deptData.id = this.department.id;
      this.departmentService.updateDepartment(deptData).subscribe({
        next: (res) => {
          this.snackBar.open('Department updated successfully', 'Close', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.snackBar.open('Failed to update department', 'Close', { duration: 3000 });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
