import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from '../models/group.model';
import { Channel } from '../models/channel.model'; // Import Channel model

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = [
    { id: '1', name: 'Group 1', channels: [{ id: '1', name: 'Channel 1', users: [], groupId: '1' }], createdBy: 'user1' },
    { id: '2', name: 'Group 2', channels: [], createdBy: 'user2' }
  ];

  getGroups(): Observable<Group[]> {
    return of(this.groups);
  }

  addGroup(name: string, createdBy: string): Observable<void> {
    const newGroup = { id: (this.groups.length + 1).toString(), name, channels: [], createdBy };
    this.groups.push(newGroup);
    this.saveToLocalStorage();
    return of();
  }

  addChannel(groupId: string, channelName: string): Observable<void> {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      const newChannel: Channel = {
        id: (group.channels.length + 1).toString(),
        name: channelName,
        users: [],
        groupId: groupId // Include groupId property
      };
      group.channels.push(newChannel);
      this.saveToLocalStorage();
    }
    return of();
  }

  addUserToGroup(groupId: string, userId: string): Observable<void> {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.channels.forEach(channel => {
        if (!channel.users) {
          channel.users = [];
        }
        channel.users.push(userId);
      });
      this.saveToLocalStorage();
    }
    return of();
  }

  deleteGroup(groupId: string): Observable<void> {
    this.groups = this.groups.filter(g => g.id !== groupId);
    this.saveToLocalStorage();
    return of();
  }

  private saveToLocalStorage() {
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }

  loadFromLocalStorage() {
    const storedGroups = localStorage.getItem('groups');
    if (storedGroups) {
      this.groups = JSON.parse(storedGroups);
    }
  }
}