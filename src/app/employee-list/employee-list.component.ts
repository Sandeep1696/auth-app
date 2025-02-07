import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Employee } from '../employee-list/models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeEditDialogComponent } from '../employee-edit-dialog/employee-edit-dialog.component';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'department','role','joiningDate','actions'];
  dataSource = new MatTableDataSource<Employee>();
  role!: string | null;
  searchControl = new FormControl('');

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeService: EmployeeService, private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    this.loadEmployees();

    this.searchControl.valueChanges.subscribe(value => {
      this.applyFilter(value || '');
    });
  }

  loadEmployees(): void {
    if (this.role === 'Admin') {
      this.employeeService.getEmployees().subscribe(data => {
        this.dataSource.data = data;
        this.initTable();
      });
    } else if (this.role === 'Manager') {
      this.employeeService.getEmployees().subscribe(data => {
        const managerId = this.authService.getUserId();
        this.dataSource.data = data;
        this.initTable();
      });
    } else {
      this.employeeService.getMyProfile().subscribe(data => {
        this.dataSource.data = [data];
        this.initTable();
      });
    }
  }

  deleteEmployee(employeeId: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe({
        next: () => {
          this.loadEmployees();  // Reload the employees after deletion
          console.log('Employee deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting employee', err);
        }
      });
    }
  }

  initTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   // 🔹 EXPORT TO EXCEL FUNCTION
   exportToExcel(): void {
    this.employeeService.exportEmployeesToExcel().subscribe(blob => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Employees.xlsx';
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }

  openEditDialog(employee: any): void {
    const dialogRef = this.dialog.open(EmployeeEditDialogComponent, {
      width: '400px',
      data: { ...employee }
    });
  
    dialogRef.afterClosed().subscribe(updatedEmployee => {
      if (updatedEmployee) {
        this.updateEmployee(updatedEmployee);
      }
    });
  }

  updateEmployee(updatedEmployee: Employee): void {
    
    this.employeeService.updateEmployee(updatedEmployee).subscribe({
      next: () => {
        this.loadEmployees();  // Refresh employee list after update
        console.log('Employee updated successfully');
      },
      error: (err) => {
        console.error('Error updating employee', err);
      }
    });
  }
}
