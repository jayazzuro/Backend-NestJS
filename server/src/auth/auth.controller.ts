import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Đăng nhập user',
    description: 'Trả về JWT access token cho user thường',
  })
  @ApiOkResponse({ description: 'Đăng nhập thành công, nhận về access_token' })
  @ApiUnauthorizedResponse({ description: 'Email hoặc mật khẩu không đúng' })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('admin/login')
  @ApiOperation({
    summary: 'Đăng nhập admin',
    description: 'Trả về JWT access token cho admin (role=ADMIN)',
  })
  @ApiOkResponse({
    description: 'Admin đăng nhập thành công, nhận về access_token',
  })
  @ApiUnauthorizedResponse({
    description: 'Email hoặc mật khẩu không đúng / không có quyền admin',
  })
  async adminLogin(@Body() loginDto: LoginDto) {
    return await this.authService.adminLogin(loginDto);
  }
}
