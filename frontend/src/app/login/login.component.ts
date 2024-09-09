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
      if (user) {
        console.log("Testing authService");
        console.table(user);
        if (this.authService.hasRole("Super Admin")) {
          this.router.navigate(['/super-admin']);
        } else if (this.authService.hasRole("Group Admin")) {
          this.router.navigate(['/groups']);
        } else if (this.authService.hasRole("User")) {
          this.router.navigate(['/chat']);
        } else {
          this.errorMessage = 'Invalid role';
        }
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }, error => {
      console.error("Error during login:", error);
      this.errorMessage = 'Invalid username or password';
    });
  }
}


