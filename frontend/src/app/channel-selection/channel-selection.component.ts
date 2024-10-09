import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { Group } from '../models/group.model';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-channel-selection',
  templateUrl: './channel-selection.component.html',
  styleUrls: ['./channel-selection.component.css']
})
export class ChannelSelectionComponent implements OnInit {
  groups: Group[] = [];
  selectedChannelId: string = '';
  socket = io('http://localhost:3000'); // Adjust the URL as needed

  constructor(private groupService: GroupService) {}

  ngOnInit() {
    this.loadGroups();
    this.socket.on('userJoined', (data) => {
      console.log(`User ${data.userId} joined channel ${data.channelId}`);
    });
    this.socket.on('userLeft', (data) => {
      console.log(`User ${data.userId} left channel ${data.channelId}`);
    });
  }

  loadGroups() {
    this.groupService.getGroups().subscribe(groups => this.groups = groups);
  }

  joinChannel() {
    if (this.selectedChannelId) {
      if (this.selectedChannelId === 'main') {
        console.log('User joined the Main Channel');
        // Emit a message to the chat component or handle it as needed
      } else {
        this.socket.emit('joinChannel', this.selectedChannelId, 'currentUserId'); // Replace 'currentUserId' with actual user ID
        console.log(`User joined channel with ID: ${this.selectedChannelId}`);
      }
    }
  }

  leaveChannel() {
    if (this.selectedChannelId) {
      this.socket.emit('leaveChannel', this.selectedChannelId, 'currentUserId'); // Replace 'currentUserId' with actual user ID
      console.log(`User left channel with ID: ${this.selectedChannelId}`);
    }
  }
}