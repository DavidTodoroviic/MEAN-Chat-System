import { User } from './user.model';

describe('User Model', () => {
  it('should create a user with the correct properties', () => {
    const user: User = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      roles: ['user'],
      groups: ['group1']
    };

    expect(user.username).toBe('testuser');
    expect(user.email).toBe('test@example.com');
  });
});

