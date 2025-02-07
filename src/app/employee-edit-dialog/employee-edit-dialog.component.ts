import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee-list/models/employee.model';

@Component({
  selector: 'app-employee-edit-dialog',
  templateUrl: './employee-edit-dialog.component.html',
  styleUrls: ['./employee-edit-dialog.component.scss']
})
export class EmployeeEditDialogComponent implements OnInit {
  editForm!: FormGroup;
  employee: any;
  role!: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.role = this.data.role;
    this.editForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      email: [this.data.email, [Validators.required, Validators.email]],
      department: [this.data.department, Validators.required],
      role: [this.data.role, Validators.required]  // Only Admin can change role
    });
  }


  onSave(): void {
    if (!this.editForm.valid) {
      console.error("Form is invalid. Cannot save.");
      return;
    }
  
    const updatedEmployee: Employee = {
      ...this.editForm.value,  // Copy form values
      id: this.data.id,        // Ensure ID is included
    };
  
    console.log("Saving Employee:", updatedEmployee);
    this.dialogRef.close(updatedEmployee);
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }
}
