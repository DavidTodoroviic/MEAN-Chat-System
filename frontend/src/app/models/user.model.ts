export interface User {
    id: string;
    username: string;
    email: string;
    roles: string[]; // e.g., ['user', 'admin']
    password: string;
    groups: string[]; // Array of group IDs
  }
  