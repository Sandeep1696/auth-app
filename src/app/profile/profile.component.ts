import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee-list/models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  employee: Employee | null = null;
  profileForm!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar  // Inject MatSnackBar for showing error messages
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.initForm();
  }

  loadProfile(): void {
    this.employeeService.getMyProfile().subscribe({
      next: (data) => {
        this.employee = data;
        this.profileForm.patchValue(data);
      },
      error: (err) => {
        console.error('Error fetching profile', err);

        // If error is 403 Forbidden, show snackbar
        if (err.status === 403) {
          this.snackBar.open('You do not have permission to access this profile.', 'Close', {
            duration: 3000,  // Show for 3 seconds
            panelClass: ['mat-toolbar', 'mat-warn'] // Customize snackbar style
          });
        } else if (err.status === 401) {
          this.snackBar.open('You are not authorized to access this profile. Please log in.', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        } else {
          // Handle other errors
          this.snackBar.open('An unexpected error occurred. Please try again later.', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-warn']
          });
        }
      }
    });
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid && this.employee) {
      const updatedProfile = this.profileForm.value;
      this.employeeService.updateProfile(this.employee.id, updatedProfile).subscribe({
        next: () => {
          console.log('Profile updated successfully');
          // Show success message
          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'mat-primary']
          });
        },
        error: (err) => {
          console.error('Error updating profile', err);
          if (err.status === 403) {
            this.snackBar.open('You do not have permission to update this profile.', 'Close', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          } else if (err.status === 401) {
            this.snackBar.open('You are not authorized to update this profile. Please log in.', 'Close', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          } else {
            this.snackBar.open('An error occurred while updating your profile.', 'Close', {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn']
            });
          }
        }
      });
    }
  }
}
