import { Controller, Get, Req, UseGuards, Body, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import type { RequestWithUser } from '../common/types/public-user.type';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Xem hồ sơ cá nhân',
    description: 'Trả về thông tin profile của user đang đăng nhập (không bao gồm password)',
  })
  @ApiOkResponse({ description: 'Lấy thông tin thành công' })
  @ApiUnauthorizedResponse({
    description: 'Chưa đăng nhập hoặc token không hợp lệ',
  })
  getProfile(@Req() req: RequestWithUser) {
    return {
      message: 'Lấy thông tin người dùng thành công',
      data: req.user,
    };
  }

  @Patch('profile')
  @ApiOperation({
    summary: 'Cập nhật hồ sơ cá nhân',
    description: 'Cập nhật username, email, hoặc password. Tất cả fields đều tùy chọn.',
  })
  @ApiOkResponse({ description: 'Cập nhật thành công' })
  @ApiUnauthorizedResponse({
    description: 'Chưa đăng nhập hoặc token không hợp lệ',
  })
  async updateProfile(@Req() req: RequestWithUser, @Body() updateProfileDto: UpdateProfileDto) {
    const user = await this.usersService.updateProfile(req.user.id, updateProfileDto);

    return {
      message: 'Cập nhật thông tin cá nhân thành công',
      data: user,
    };
  }
}
