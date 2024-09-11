import { Channel } from './channel.model';

export interface Group {
  id: string;
  name: string;
  createdBy: string; // User ID of the creator
  channels: Channel[]; // Array of Channel objects
}
