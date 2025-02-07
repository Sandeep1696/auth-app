import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';  
import { ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    MatSnackBarModule,  
    ReactiveFormsModule  
  ]
})
export class ProfileModule { }
