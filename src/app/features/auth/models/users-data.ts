import { User } from '../models/user.model';

export const usersData: Record<string, User> = {
  admin: { username: 'admin', password: 'admin', role: 'admin' },
  user: { username: 'user', password: 'user', role: 'user' },
};
