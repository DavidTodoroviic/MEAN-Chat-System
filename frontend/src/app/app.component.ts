import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ChannelService } from './services/channel.service';
import { Channel } from './models/channel.model'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  channels: Channel[] = [];
  groups: any[] = []; 
  users: any[] = [];
  groupName: string = '';
  channelName: string = '';
  selectedUserId: string = '';

  constructor(
    private authService: AuthService,
    private channelService: ChannelService,
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
}