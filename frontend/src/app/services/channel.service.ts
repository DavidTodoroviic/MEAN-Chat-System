import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Channel } from '../models/channel.model';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  private apiUrl = 'http://localhost:3000/api/channels'; // Update with your actual API URL
  private channels: Channel[] = [];

  constructor(private http: HttpClient) {}

  // Get all channels
  getChannels(): Observable<Channel[]> {
    return this.http.get<Channel[]>(this.apiUrl);
  }

  // Add a new channel
  addChannel(channel: Channel): Observable<Channel> {
    // Mock implementation for adding a channel
    this.channels.push(channel);
    return of(channel); // Use 'of' to return an observable
  }
}