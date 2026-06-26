import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) {}

  // USER LOGIN
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    // JWT Payload
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Tạo JWT Token
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Đăng nhập thành công',
      access_token: accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  }

  // ADMIN LOGIN
  async adminLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const admin = await this.userRepository.findOne({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    if (admin.role !== Role.ADMIN) {
      throw new ForbiddenException('Bạn không có quyền Admin');
    }

    // JWT Payload
    const payload = {
      sub: admin.id,
      email: admin.email,
      role: admin.role,
    };

    // Tạo JWT Token
    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Admin đăng nhập thành công',
      access_token: accessToken,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    };
  }

  // HASH PASSWORD
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // COMPARE PASSWORD
  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
