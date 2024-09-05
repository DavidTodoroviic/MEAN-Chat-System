import { Channel } from './channel.model';

describe('Channel Model', () => {
  it('should create a channel with the correct properties', () => {
    const channel: Channel = {
      id: '1',
      name: 'General',
      users: ['user1', 'user2']
    };

    expect(channel.id).toBe('1');
    expect(channel.name).toBe('General');
    expect(channel.users.length).toBe(2);
  });
});
