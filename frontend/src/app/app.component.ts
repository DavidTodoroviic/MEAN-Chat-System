import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  title = 'frontend';
  
  isLoggedIn() {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.hasRole('Super Admin') || this.authService.hasRole('Group Admin');
  }

  isUser() {
    return this.authService.hasRole('User');
  }
}


