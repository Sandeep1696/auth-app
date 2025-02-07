import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../employee-list/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5129/api/user';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getMyProfile(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/my-profile`);
  }

  updateProfile(employeeId: number, updatedEmployee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/update-user/${employeeId}`, updatedEmployee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/update-user/${employee.id}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete-user/${employeeId}`);
  }

  exportEmployeesToExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export-employees`, {
      responseType: 'blob'
    });
  }
}
