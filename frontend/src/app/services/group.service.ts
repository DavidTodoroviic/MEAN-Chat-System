import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:3000/groups'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl);
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.apiUrl, group);
  }

  addChannel(groupId: string, channelName: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${groupId}/channels`, { name: channelName });
  }

  addUserToGroup(groupId: string, userId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${groupId}/users`, { userId });
  }

  removeUserFromGroup(groupId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${groupId}/users/${userId}`);
  }

  removeUserFromChannel(groupId: string, channelId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${groupId}/channels/${channelId}/users/${userId}`);
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${groupId}`);
  }
}