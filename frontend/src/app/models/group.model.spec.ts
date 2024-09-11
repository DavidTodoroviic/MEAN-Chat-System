import { Group } from './group.model';
import { Channel } from './channel.model';

describe('Group Model', () => {
  it('should create a group with the correct properties', () => {
    const channels: Channel[] = [
      { id: '1', name: 'General', users: ['user1', 'user2'], groupId: '1' },
      { id: '2', name: 'Random', users: ['user3'], groupId: '1' }
    ];

    const group: Group = {
      id: '1',
      name: 'Test Group',
      channels: channels,
      users: ['user1', 'user2', 'user3'],
      newChannelName: "Main"
    };

    expect(group.id).toBe('1');
    expect(group.name).toBe('Test Group');
    expect(group.channels.length).toBe(2);
    expect(group.users.length).toBe(3);
  });
});
