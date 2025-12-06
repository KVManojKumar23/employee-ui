import { Component } from '@angular/core';
import { EmployeeService } from '../../../core/services/employee/employee.service';
import { DepartmentService } from '../../../core/services/department/department.service';

@Component({
  selector: 'app-home-dashboard',
  standalone: false,
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css',
})
export class HomeDashboardComponent {
  employeeCount!: number;
  departmentCount!: number;
  activeEmployeeCount!: number;

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
  ) {
    this.fetchEmployeeCount();
    this.fetchDepartmentCount();
  }

  fetchEmployeeCount() {
    this.employeeService.getAllEmployees().subscribe((count) => {
      this.employeeCount = count.length;
      this.activeEmployeeCount = count.filter(emp => emp.active).length;
    });
  }

  fetchDepartmentCount() {
    this.departmentService.getAllDepartments().subscribe((count) => {
      this.departmentCount = count.length;
    });
  }

}
