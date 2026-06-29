import { Injectable, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';
import { AUTH_MESSAGES } from '../common/constants/messages.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.validateCredentials(loginDto);
    return this.buildAuthResponse(user, AUTH_MESSAGES.LOGIN_SUCCESS);
  }

  async adminLogin(loginDto: LoginDto) {
    const admin = await this.validateCredentials(loginDto, true);
    return this.buildAuthResponse(admin, AUTH_MESSAGES.ADMIN_LOGIN_SUCCESS);
  }

  private async validateCredentials(loginDto: LoginDto, requireAdmin = false): Promise<User> {
    const user = await this.usersRepository.findByEmailForAuth(loginDto.email);

    if (!user) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException(AUTH_MESSAGES.INVALID_CREDENTIALS);
    }

    if (requireAdmin && user.role !== Role.ADMIN) {
      throw new ForbiddenException(AUTH_MESSAGES.NOT_ADMIN);
    }

    return user;
  }

  private buildAuthResponse(user: User, message: string) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      message,
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }
}