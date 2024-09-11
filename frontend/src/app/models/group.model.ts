import { Channel } from './channel.model';

export interface Group {
  id: string;
  name: string;
  channels: Channel[]; // Array of Channel objects
  users: string[]; // Array of user IDs
  
}
