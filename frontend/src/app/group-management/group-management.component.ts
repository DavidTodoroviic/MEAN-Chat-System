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
  groups: Group[] = [];
  users: User[] = [];
  newGroupName: string = '';
  selectedUserId: string = '';
  currentUserId: string = 'currentUserId'; // Replace with actual current user ID

  constructor(private groupService: GroupService, private userService: UserService) {}

  ngOnInit() {
    this.loadGroups();
    this.loadUsers();
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(groups => {
      this.groups = groups.map(group => ({ ...group, newChannelName: '' })); // Initialize newChannelName
    });
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  createGroup() {
    if (this.newGroupName) {
      const newGroup: Group = {
        id: this.generateId(),
        name: this.newGroupName,
        createdBy: this.currentUserId,
        channels: [],
        users: [],
        newChannelName: ''
      };
      this.groupService.addGroup(newGroup).subscribe(group => {
        this.groups.push(group);
        this.newGroupName = '';
      });
    }
  }

  addChannel(groupId: string, channelName: string) {
    if (channelName) {
      this.groupService.addChannel(groupId, channelName).subscribe(() => {
        const group = this.groups.find(g => g.id === groupId);
        if (group) {
          group.channels.push({ id: this.generateId(), name: channelName, groupId, users: [] });
          group.newChannelName = '';
        }
      });
    }
  }

  addUserToGroup(groupId: string, userId: string) {
    this.groupService.addUserToGroup(groupId, userId).subscribe(() => {
      const group = this.groups.find(g => g.id === groupId);
      if (group && !group.users.includes(userId)) {
        group.users.push(userId);
      }
    });
  }

  removeUserFromGroup(groupId: string, userId: string) {
    this.groupService.removeUserFromGroup(groupId, userId).subscribe(() => {
      const group = this.groups.find(g => g.id === groupId);
      if (group) {
        group.users = group.users.filter(id => id !== userId);
      }
    });
  }

  removeUserFromChannel(groupId: string, channelId: string, userId: string) {
    this.groupService.removeUserFromChannel(groupId, channelId, userId).subscribe(() => {
      const group = this.groups.find(g => g.id === groupId);
      if (group) {
        const channel = group.channels.find(c => c.id === channelId);
        if (channel) {
          channel.users = channel.users.filter(user => user.id !== userId);
        }
      }
    });
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.groups = this.groups.filter(g => g.id !== groupId);
    });
  }

  generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  getUserNameById(userId: string): string {
    const user = this.users.find(user => user.id === userId);
    return user ? user.username : 'Unknown User';
  }
}