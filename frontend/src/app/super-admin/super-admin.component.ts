import { Component } from '@angular/core';
import { UserService } from '../services/user.service';  
import { User } from '../models/user.model';  

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
    password: '',  
    roles: ['User'], 
    groups: []  
  };

  constructor(private userService: UserService) {}

  createUser() {
    this.userService.usernameExists(this.newUser.username).subscribe(exists => {
      if (exists) {
        console.error('Username already exists');
        return;
      }

      this.userService.createUser(this.newUser).subscribe(
        () => {
          console.log('User created successfully');
          this.newUser = { 
            id: '', 
            username: '', 
            email: '', 
            password: '',  // Reset password
            roles: ['User'], 
            groups: []  // Reset groups
          };
        },
        (error) => {
          console.error('Error creating user', error);
        }
      );
    });
  }
}
