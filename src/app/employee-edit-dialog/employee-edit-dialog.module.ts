import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeEditDialogComponent } from './employee-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';  // ✅ Import MatSelectModule
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeEditDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,  
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EmployeeEditDialogComponent]
})
export class EmployeeEditDialogModule { }
