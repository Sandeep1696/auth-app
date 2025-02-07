import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'auth-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // if token is expired on app load (page refresh)
    const token = this.authService.getToken();
    if (token && this.authService.isTokenExpired(token))
    {
      console.log('Token expired on page load, refreshing token...');
      
      this.authService.refreshToken().subscribe({
        next: (response) => {
          console.log('Token refreshed successfully.');
        },
        error: (error) => {
          console.error('Error refreshing token:', error);
        }
      });
    }
  }
}
