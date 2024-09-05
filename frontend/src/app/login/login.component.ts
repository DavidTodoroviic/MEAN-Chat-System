import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username, this.password)) {
      const role = this.authService.getRole();
      if (role === 'Super Admin') {
        this.router.navigate(['/super-admin-dashboard']);
      } else if (role === 'Group Admin') {
        this.router.navigate(['/group-management']);
      } else {
        this.router.navigate(['/chat']);
      }
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}


