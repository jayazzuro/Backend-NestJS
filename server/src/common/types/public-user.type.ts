import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

export type PublicUser = Pick<
  User,
  'id' | 'username' | 'email' | 'role' | 'createdAt' | 'updatedAt'
>;

export interface RequestWithUser extends Request {
  user: PublicUser;
}
