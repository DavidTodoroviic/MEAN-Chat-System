import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../app/services/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.hasRole('Super Admin') || this.authService.hasRole('Group Admin')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
