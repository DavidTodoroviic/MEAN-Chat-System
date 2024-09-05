import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'super', password: '123', role: 'Super Admin' },
    { username: 'admin', password: '123', role: 'Group Admin' },
    { username: 'user', password: '123', role: 'User' }
  ];
  private currentUser: any = null;

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getRole(): string {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).role : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}

