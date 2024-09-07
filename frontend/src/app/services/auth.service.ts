import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any = null;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    console.log("user creds:", username, password)
    let user = null;

    // Retrive and check user with data.json (which should be replaced with a browser local storage)
    const url = 'http://localhost:3000/api/login';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(url, body, { headers }).pipe(
      
      map(user => {
        console.table(user),
        this.currentUser = user;
        return user;
      }),
      catchError(error => {
        console.error('Login error:', error);
        return of(null);
      })
    );

    // // Simulate the login logic
    // if (username === 'super' && password === '123') {
    //   user = { username, roles: ['Super Admin'] };
    // } else if (username === 'admin' && password === '123') {
    //   user = { username, roles: ['Group Admin'] };
    // } else if (username === 'user' && password === '123') {
    //   user = { username, roles: ['User'] };
    // }

    // if (user) {
    //   this.currentUser = user;
    //   return of(user); // Return the user as an Observable
    // } else {
    //   return of(null); // Return null as an Observable in case of failure
    // }
  }

  logout() {
    this.currentUser = null;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  hasRole(role: string): boolean {
    return this.currentUser && this.currentUser.roles.includes(role);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // New methods
  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  isSuperAdmin(): boolean {
    return this.hasRole('Super Admin');
  }

  isUser(): boolean {
    return this.hasRole('User');
  }

  isAdmin(): boolean {
    return this.hasRole('Group Admin');
  }
}

