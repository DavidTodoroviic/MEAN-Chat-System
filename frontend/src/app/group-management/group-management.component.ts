import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { UserService } from '../services/user.service';
import { Group } from '../models/group.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent implements OnInit {
  groupName: string = '';
  channelName: string = '';
  groups: Group[] = [];
  users: User[] = [];
  selectedUserId: string = '';
  currentUserId: string = '';  // Add a property to store the current user ID
  
  constructor(private groupService: GroupService, private userService: UserService) {}

  ngOnInit() {
    this.loadGroups();
    this.loadUsers();
    this.currentUserId = this.userService.getCurrentUserId();  // Get the current user ID
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups;
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  addGroup() {
    if (this.groupName.trim()) {
      this.groupService.addGroup(this.groupName, this.currentUserId).subscribe(() => {
        this.groupName = '';
        this.loadGroups();  // Refresh the group list after adding
      });
    }
  }

  addChannel(groupId: string) {
    if (this.channelName.trim()) {
      this.groupService.addChannel(groupId, this.channelName).subscribe(() => {
        this.channelName = '';
        this.loadGroups();  // Refresh the group list after adding a channel
      });
    }
  }

  addUserToGroup(groupId: string) {
    if (this.selectedUserId) {
      this.groupService.addUserToGroup(groupId, this.selectedUserId).subscribe(() => {
        this.loadGroups();  // Refresh the group list after adding a user
      });
    }
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.loadGroups();  // Refresh the group list after deleting
    });
  }
}