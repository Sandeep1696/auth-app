import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }
}