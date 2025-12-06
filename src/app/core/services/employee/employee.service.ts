import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../../shared/models/employee';
import { Observable, Subject, tap } from 'rxjs';
import { API_BASE_URL } from '../../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private refreshNeeded$ = new Subject<void>();

  get refresh$() {
    return this.refreshNeeded$.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  registerEmployee(employee: Employee): Observable<void> {
    return this.httpClient.post<void>(
      `${API_BASE_URL}/employee/create`,
      employee
    ).pipe( tap(() => {
      this.refreshNeeded$.next();
    }));
  }

  updateEmployee(employee: Employee): Observable<void> {
    return this.httpClient.put<void>(
      `${API_BASE_URL}/employee/update`,
      employee
    ).pipe(tap(() => {
      this.refreshNeeded$.next();
    }));
  }

  deleteEmployee(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${API_BASE_URL}/employee/delete/${id}`
    );
  }

  getEmployee(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${API_BASE_URL}/employee/${id}`);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${API_BASE_URL}/employee/all`);
  }
}
