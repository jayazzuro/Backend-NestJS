import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { UsersRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.validateCredentials(loginDto);
    return this.buildAuthResponse(user, 'Đăng nhập thành công');
  }

  async adminLogin(loginDto: LoginDto) {
    const admin = await this.validateCredentials(loginDto, true);
    return this.buildAuthResponse(admin, 'Admin đăng nhập thành công');
  }

  private async validateCredentials(loginDto: LoginDto, requireAdmin = false): Promise<User> {
    const user = await this.usersRepository.findByEmailForAuth(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    if (requireAdmin && user.role !== Role.ADMIN) {
      throw new ForbiddenException('Bạn không có quyền Admin');
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
