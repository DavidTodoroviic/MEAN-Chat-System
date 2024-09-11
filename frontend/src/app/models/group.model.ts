import { Channel } from './channel.model';

export interface Group {
  id: string;
  name: string;
  channels: Channel[]; 
  users: string[]; 
  newChannelName: string;
}
