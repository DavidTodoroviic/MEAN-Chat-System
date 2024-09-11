import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChannelService } from './services/channel.service';
import { UserService } from './services/user.service'; // Assuming you have a UserService
import { GroupService } from './services/group.service'; // Assuming you have a GroupService
import { Channel } from './models/channel.model'; // Assuming you have a Channel model

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  channels: Channel[] = [];
  groups: any[] = []; // Assuming you have a groups property
  users: any[] = []; // Assuming you have a users property
  groupName: string = '';
  channelName: string = '';
  selectedUserId: string = '';

  constructor(
    private authService: AuthService,
    private channelService: ChannelService,
    private userService: UserService,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.loadChannels();
  }


  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isSuperAdmin(): boolean {
    return this.authService.isSuperAdmin();
  }

  isUser(): boolean {
    return this.authService.isUser();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  loadChannels() {
    this.channelService.getChannels().subscribe((channels: Channel[]) => {
      this.channels = channels;
    });
  }

  addGroup() {
    this.groups.push(this.groupName);
    this.groupName = '';
  }

  addChannel(groupId: string) {
    const newChannel: Channel = {
      id: '', // Assuming you have an id property in Channel model
      name: this.channelName,
      groupId: groupId,
      users: [] // Initialize users as an empty array
    };
    this.channelService.addChannel(newChannel).subscribe((channel: Channel) => {
      this.channels.push(channel);
      this.channelName = '';
    });
  }

  addUserToGroup(groupId: string) {
    const newUser: any = {
      id: '', // Assuming you have an id property in User model
      name: this.selectedUserId,
      groupId: groupId
    };
    this.userService.createUser(newUser).subscribe((user: any) => {
      this.users.push(user);
      this.selectedUserId = '';
    });
  }

  deleteGroup(groupId: string) {
    this.groupService.deleteGroup(groupId).subscribe(() => {
      this.groups = this.groups.filter(group => group.id !== groupId);
    });
  }
}