import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { PublicUser } from '../common/types/public-user.type';
import { USER_MESSAGES } from '../common/constants/messages.constant';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findByIdWithPassword(id);
    if (!user) {
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findByUsername(username);
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<PublicUser> {
    const user = await this.findById(id);
    const { username, email, password } = updateProfileDto;

    if (username && username !== user.username) {
      const existingUsername = await this.findByUsername(username);
      if (existingUsername) {
        throw new ConflictException(USER_MESSAGES.USERNAME_EXISTS);
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingEmail = await this.findByEmail(email);
      if (existingEmail) {
        throw new ConflictException(USER_MESSAGES.EMAIL_EXISTS);
      }
      user.email = email;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await this.usersRepository.save(user);

    const updatedUser = await this.usersRepository.findByIdPublic(id);
    if (!updatedUser) {
      throw new NotFoundException(USER_MESSAGES.NOT_FOUND);
    }

    return updatedUser;
  }
}

