import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private authService: AuthService) {}

  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.hasRole('Group Admin');
  }

  isSuperAdmin() {
    return this.authService.hasRole('Super Admin');
  }

  isUser() {
    return this.authService.hasRole('User');
  }
}


