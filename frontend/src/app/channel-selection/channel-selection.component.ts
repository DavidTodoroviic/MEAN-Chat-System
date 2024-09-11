import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { Group } from '../models/group.model';

@Component({
  selector: 'app-channel-selection',
  templateUrl: './channel-selection.component.html',
  styleUrls: ['./channel-selection.component.css']
})
export class ChannelSelectionComponent implements OnInit {
  groups: Group[] = [];
  selectedChannelId: string = '';

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(groups => this.groups = groups);
  }

  joinChannel() {
    if (this.selectedChannelId) {
      console.log(`User joined channel with ID: ${this.selectedChannelId}`);
      // Logic to join the channel
    }
  }
}

