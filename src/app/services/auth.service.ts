import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {jwtDecode} from 'jwt-decode';  

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5129/api';  
  private isAuthenticated = false;
  private userRole: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Get refresh token from localStorage
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const expirationDate = decodedToken.exp * 1000; // Convert to milliseconds
      return Date.now() > expirationDate; // true if token is expired
    } 
    catch (e)
     {
      console.error('Error decoding token:', e);
      return true; // If any error occurs during decoding, treat as expired
    }
  }

  // Get the user role from the JWT token
  getUserRole(): string | null {
    if (!this.userRole) {
      const token = this.getToken();
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          this.userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        } catch (error) {
          console.error('Error decoding token:', error);
          return null;
        }
      }
    }
    return this.userRole;
  }

  // getUserId(): number | null {
  //   const token = this.getToken();
  //   if (!token) return null;

  //   try {
  //     const decoded: any = jwtDecode(token);
  //     return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  //   } catch (error) {
  //     return null;
  //   }
  // }
  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      console.log("✅ Decoded JWT Payload:", decoded);
  
      // Check if expected claim exists
      const userId = decoded["EmployeeId"];
      console.log("🔍 Extracted User ID:", userId);
  
      return userId ? Number(userId) : null;
    } catch (error) {
      console.error("❌ Error decoding JWT:", error);
      return null;
    }
  }
  

  // Login API call
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response?.token && response?.refreshToken) {
          // Store tokens in localStorage
          localStorage.setItem('token', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.isAuthenticated = true;
          this.getUserRole();
        }
      })
    );
  }

  // Logout function
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.isAuthenticated = false;
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Refresh token API call
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return new Observable(observer => observer.error('No refresh token available'));
    }

    return this.http.post(`${this.apiUrl}/auth/refresh-token`, { refreshToken }).pipe(
      tap((response: any) => {
        if (response?.accessToken && response?.refreshToken) {
          // Store new tokens in localStorage
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      })
    );
  }
}
