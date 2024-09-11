import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group } from '../models/group.model';
import { Channel } from '../models/channel.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups: Group[] = [];

  constructor() {}

  getGroups(): Observable<Group[]> {
    return of(this.groups);
  }

  addGroup(group: Group): Observable<Group> {
    this.groups.push(group);
    return of(group);
  }

    addChannel(groupId: string, channelName: string): Observable<void> {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      const newChannel: Channel = {
        id: this.generateId(),
        name: channelName,
        groupId: groupId,
        users: []
      };
      group.channels.push(newChannel);
    }
    return of();
  }

  addUserToGroup(groupId: string, userId: string): Observable<void> {
    const group = this.groups.find(g => g.id === groupId);
    if (group && !group.users.includes(userId)) {
      group.users.push(userId);
    }
    return of();
  }

  removeUserFromGroup(groupId: string, userId: string): Observable<void> {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.users = group.users.filter(id => id !== userId);
    }
    return of();
  }

  removeUserFromChannel(groupId: string, channelId: string, userId: string): Observable<void> {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      const channel = group.channels.find(c => c.id === channelId);
      if (channel) {
        channel.users = channel.users.filter(id => id !== userId);
      }
    }
    return of();
  }

  deleteGroup(groupId: string): Observable<void> {
    this.groups = this.groups.filter(g => g.id !== groupId);
    return of();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
}