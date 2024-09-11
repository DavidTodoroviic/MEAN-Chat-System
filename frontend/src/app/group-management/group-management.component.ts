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

  ngOnInit(): void {
    this.loadGroups();
    this.loadUsers();
  }

  loadGroups(): void {
    this.groupService.getGroups().subscribe(
      (groups) => this.groups = groups,
      (error) => console.error('Error loading groups', error)
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => this.users = users,
      (error) => console.error('Error loading users', error)
    );
  }

  createGroup(): void {
    const newGroup: Group = { id: this.generateId(), name: this.newGroupName, channels: [], users: [] };
    this.groupService.addGroup(newGroup).subscribe(
      (group) => {
        this.groups.push(group);
        this.newGroupName = '';
      },
      (error) => console.error('Error creating group', error)
    );
  }

  addChannel(groupId: string, channelName: string): void {
    if (channelName) {
      this.groupService.addChannel(groupId, channelName).subscribe(
        () => this.loadGroups(),
        (error) => console.error('Error adding channel', error)
      );
    }
  }

  addUserToGroup(groupId: string, userId: string): void {
    this.groupService.addUserToGroup(groupId, userId).subscribe(
      () => this.loadGroups(),
      (error) => console.error('Error adding user to group', error)
    );
  }

  removeUserFromGroup(groupId: string, userId: string): void {
    this.groupService.removeUserFromGroup(groupId, userId).subscribe(
      () => this.loadGroups(),
      (error) => console.error('Error removing user from group', error)
    );
  }

  removeUserFromChannel(groupId: string, channelId: string, userId: string): void {
    this.groupService.removeUserFromChannel(groupId, channelId, userId).subscribe(
      () => this.loadGroups(),
      (error) => console.error('Error removing user from channel', error)
    );
  }

  getUserNameById(userId: string): string {
    const user = this.users.find(u => u.id === userId);
    return user ? user.username : 'Unknown';
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}