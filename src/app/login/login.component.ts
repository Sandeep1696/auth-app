import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage = '';
  isLoading = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}


  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true; // Start loading
      const { email, password } = this.loginForm.value;
      this.auth.login(email!, password!)
        .subscribe({
          next: () => {
            this.router.navigate(['/home']);
            this.isLoading = false;
          },
          error: (err) => {
            this.errorMessage = err.error?.message || 'Login failed';
            this.isLoading = false;
          }
        });
    }
  }


}