import { Component } from '@angular/core';
import { UserService } from '../services/user.service';  // Correct path to UserService
import { User } from '../models/user.model';  // Correct path to User model

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent {
  newUser: User = { 
    id: '', 
    username: '', 
    email: '', 
    password: '',  // Initialize password
    roles: ['User'], 
    groups: []  // Initialize groupsts
  };

  constructor(private userService: UserService) {}

  createUser() {
    this.userService.createUser(this.newUser).subscribe(
      () => {
        console.log('User created successfully');
        this.newUser = { 
          id: '', 
          username: '', 
          email: '', 
          password: '',  // Reset password
          roles: ['User'], 
          groups: []  // Reset groupsts
        };
        console.log("createUser from super-admin.component.ts");
        console.table(this.newUser);
      },
      (error) => {
        console.error('Error creating user', error);
      }
    );
  }
}
