import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';  // Import your User model

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:3000/api/users';  // Update with your actual API URL

  constructor(private http: HttpClient) { }

  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Delete a user by ID
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }

  // Promote a user to Group Admin
  promoteUser(userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/promote`, { userId });
  }

  // Get the current user ID
  getCurrentUserId(): string {
    // Assuming the current user ID is stored in localStorage or some other storage
    return localStorage.getItem('currentUserId') || 'defaultUserId';
  }

  // Check if a username already exists
  usernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${username}`);
  }
}
