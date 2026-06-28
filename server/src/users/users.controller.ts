import { Controller, Get, Req, UseGuards, Body, Patch } from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestWithUser } from '../common/types/public-user.type';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
    return {
      message: 'Lấy thông tin người dùng thành công',
      data: req.user,
    };
  }

  @Patch('profile')
  async updateProfile(@Req() req: RequestWithUser, @Body() updateProfileDto: UpdateProfileDto) {
    const user = await this.usersService.updateProfile(req.user.id, updateProfileDto);

    return {
      message: 'Cập nhật thông tin cá nhân thành công',
      data: user,
    };
  }
}
