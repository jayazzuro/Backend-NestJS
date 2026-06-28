import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { PublicUser } from '../common/types/public-user.type';

const PUBLIC_USER_SELECT = {
  id: true,
  username: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} as const;

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmailForAuth(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({
      where: { email },
      select: { id: true },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.findOne({
      where: { username },
      select: { id: true },
    });
  }

  async findByIdPublic(id: number): Promise<PublicUser | null> {
    return this.findOne({
      where: { id },
      select: { ...PUBLIC_USER_SELECT },
    });
  }

  async findByIdWithPassword(id: number): Promise<User | null> {
    return this.findOne({ where: { id } });
  }
}
