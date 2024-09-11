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
          if (user.roles) {
            console.log("User roles:", user.roles);
            if (user.roles.includes('Super Admin')) {
              this.router.navigate(['/super-admin']);
            } else if (user.roles.includes('Group Admin')) {
              this.router.navigate(['/groups']);
            } else if (user.roles.includes('User')) {
              this.router.navigate(['/chat']);
            } else {
              this.errorMessage = 'Invalid role';
            }
          } else {
            this.errorMessage = 'Roles not defined';
          }
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      }, error => {
        this.errorMessage = 'Invalid username or password';
      });
    }
}


