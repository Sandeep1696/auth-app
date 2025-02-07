import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.authService.getToken();
    if (token && !this.authService.isTokenExpired(token))
    {
      // Token is valid, allow access
      return true;
    } 
    else
     {
      // Token is expired or not available, navigate to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
