import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { ProfileComponent } from './profile/profile.component';
// import { SettingsComponent } from './settings/settings.component';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { EmployeeListModule } from './employee-list/employee-list.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeEditDialogModule } from './employee-edit-dialog/employee-edit-dialog.module';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    MatSelectModule,
    EmployeeEditDialogModule,
    EmployeeListModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
          // Angular Material Modules
          MatButtonModule,
          MatFormFieldModule,
          MatInputModule,
          MatIconModule,
          MatSidenavModule,
          MatToolbarModule,
          MatListModule,
          MatCardModule,
          MatSnackBarModule,
          MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor,
      multi: true 
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
