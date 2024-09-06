import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
    this.authService.login(this.username, this.password).subscribe(user => {
      if (user.roles.includes('Super Admin')) {
        this.router.navigate(['/groups']);
      } else if (user.roles.includes('Group Admin')) {
        this.router.navigate(['/groups']);
      } else if (user.roles.includes('User')) {
        this.router.navigate(['/chat']);
      } else {
        this.errorMessage = 'Invalid role';
      }
    }, error => {
      this.errorMessage = 'Invalid username or password';
    });
  }
}


