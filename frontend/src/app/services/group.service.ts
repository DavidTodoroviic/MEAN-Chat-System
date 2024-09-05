import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups = [
    { id: '1', name: 'Group 1', channels: [{ id: '1', name: 'Channel 1' }] },
    { id: '2', name: 'Group 2', channels: [] }
  ];

  getGroups() {
    return this.groups;
  }

  addGroup(name: string) {
    const newGroup = { id: (this.groups.length + 1).toString(), name, channels: [] };
    this.groups.push(newGroup);
    this.saveToLocalStorage();
  }

  addChannel(groupId: string, channelName: string) {
    const group = this.groups.find(g => g.id === groupId);
    if (group) {
      group.channels.push({ id: (group.channels.length + 1).toString(), name: channelName });
      this.saveToLocalStorage();
    }
  }

  deleteGroup(groupId: string) {
    this.groups = this.groups.filter(g => g.id !== groupId);
    this.saveToLocalStorage();
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
