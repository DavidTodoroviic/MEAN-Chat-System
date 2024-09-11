import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'http://your-api-url/groups';

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}`);
  }

  addGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.baseUrl}`, group);
  }

  updateGroup(group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.baseUrl}/${group.id}`, group);
  }

  deleteGroup(groupId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${groupId}`);
  }

  addChannel(groupId: string, channelName: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${groupId}/channels`, { name: channelName });
  }

  addUserToGroup(groupId: string, userId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${groupId}/users`, { userId });
  }

  removeUserFromChannel(groupId: string, channelId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${groupId}/channels/${channelId}/users/${userId}`);
  }

  removeUserFromGroup(groupId: string, userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${groupId}/users/${userId}`);
  }
}