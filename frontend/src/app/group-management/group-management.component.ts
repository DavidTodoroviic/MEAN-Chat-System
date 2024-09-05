import { Component } from '@angular/core';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.css']
})
export class GroupManagementComponent {
  groupName: string = '';
  channelName: string = '';
  groups: any[] = [];

  constructor(private groupService: GroupService) {
    this.groups = this.groupService.getGroups();
  }

  addGroup() {
    if (this.groupName.trim()) {
      this.groupService.addGroup(this.groupName);
      this.groupName = '';
      this.groups = this.groupService.getGroups(); // Refresh the group list
    }
  }

  addChannel(groupId: string) {
    if (this.channelName.trim()) {
      this.groupService.addChannel(groupId, this.channelName);
      this.channelName = '';
      this.groups = this.groupService.getGroups(); // Refresh the group list
    }
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId);
    this.groups = this.groupService.getGroups(); // Refresh the group list
  }
}



