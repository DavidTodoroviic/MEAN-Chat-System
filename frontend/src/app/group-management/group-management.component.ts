// group-management.component.ts
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
      const newGroup: Group = { id: '', name: this.newGroupName, createdBy: '', channels: [], users: [], newChannelName: '' };
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
          group.channels.push({ id: '', name: channelName, groupId: groupId, users: [] });
          group.newChannelName = ''; // Clear the input field
        }
      });
    }
  }

  addUserToChannel(groupId: string, channelId: string, userId: string) {
    this.groupService.addUserToGroup(groupId, userId).subscribe(() => {
      const group = this.groups.find(g => g.id === groupId);
      const channel = group?.channels.find(c => c.id === channelId);
      const user = this.users.find(u => u.id === userId);
      if (channel && user) {
        channel.users.push(user);
      }
    });
  }

  removeUserFromChannel(groupId: string, channelId: string, userId: string) {
    this.groupService.removeUserFromChannel(groupId, channelId, userId).subscribe(() => {
      const group = this.groups.find(g => g.id === groupId);
      const channel = group?.channels.find(c => c.id === channelId);
      if (channel) {
        channel.users = channel.users.filter(u => u.id !== userId);
      }
    });
  }

  removeUserFromGroup(groupId: string, userId: string) {
    this.groupService.removeUserFromGroup(groupId, userId).subscribe(() => {
      const group = this.groups.find(g => g.id === groupId);
      if (group) {
        group.users = group.users.filter(u => u.id !== userId);
      }
    });
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.groups = this.groups.filter(g => g.id !== groupId);
    });
  }
}