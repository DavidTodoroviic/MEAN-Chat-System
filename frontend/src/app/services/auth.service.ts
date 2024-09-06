import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;

  login(username: string, password: string): Observable<any> {
    let user = null;

    // Simulate the login logic
    if (username === 'super' && password === '123') {
      user = { username, roles: ['Super Admin'] };
    } else if (username === 'admin' && password === '123') {
      user = { username, roles: ['Group Admin'] };
    } else if (username === 'user' && password === '123') {
      user = { username, roles: ['User'] };
    }

    if (user) {
      this.currentUser = user;
      return of(user); // Return the user as an Observable
    } else {
      return of(null); // Return null as an Observable in case of failure
    }
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasRole(role: string): boolean {
    return this.currentUser && this.currentUser.roles.includes(role);
  }

  logout() {
    this.currentUser = null;
  }
}

