import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend'; 

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isSuperAdmin() {
    return this.authService.hasRole('Super Admin');
  }

  isAdmin() {
    return this.authService.hasRole('Group Admin');
  }

  isUser() {
    return this.authService.hasRole('User');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
