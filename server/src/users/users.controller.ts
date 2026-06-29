import { Controller, Get, Req, UseGuards, Body, Patch } from '@nestjs/common';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { RequestWithUser } from '../common/types/public-user.type';
import { USER_MESSAGES } from '../common/constants/messages.constant';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
    return {
      message: USER_MESSAGES.GET_PROFILE_SUCCESS,
      data: req.user,
    };
  }

  @Patch('profile')
  async updateProfile(@Req() req: RequestWithUser, @Body() updateProfileDto: UpdateProfileDto) {
    const user = await this.usersService.updateProfile(req.user.id, updateProfileDto);

    return {
      message: USER_MESSAGES.UPDATE_PROFILE_SUCCESS,
      data: user,
    };
  }
}

