import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Department } from '../../../shared/models/department';
import { API_BASE_URL } from '../../../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private refreshNeeded$ = new Subject<void>();

  get refresh$() {
    return this.refreshNeeded$.asObservable();
  }

  constructor(private httpClient: HttpClient) {}

  addDepartment(department: Department): Observable<void> {
    return this.httpClient
      .post<void>(`${API_BASE_URL}/department/create`, department)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(`${API_BASE_URL}/department/all`);
  }

  getDepartment(id: number): Observable<Department> {
    return this.httpClient.get<Department>(`${API_BASE_URL}/department/${id}`);
  }

  updateDepartment(department: Department): Observable<void> {
    return this.httpClient
      .put<void>(`${API_BASE_URL}/department/update`, department)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        })
      );
  }

  deleteDepartment(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${API_BASE_URL}/department/delete/${id}`
    );
  }
}
