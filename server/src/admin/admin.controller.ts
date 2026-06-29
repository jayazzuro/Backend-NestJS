import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { RolesGuard } from '../common/guards/roles.guard';
import { GIFT_MESSAGES } from '../common/constants/messages.constant';
import { CreateGiftDto } from '../gifts/dto/create-gift.dto';
import { GetGiftsQueryDto } from '../gifts/dto/get-gifts-query.dto';
import { UpdateGiftDto } from '../gifts/dto/update-gift.dto';
import { GiftsService } from '../gifts/gifts.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin/gifts')
export class AdminController {
  constructor(private readonly giftsService: GiftsService) {}

  @Post()
  async create(@Body() createGiftDto: CreateGiftDto) {
    const gift = await this.giftsService.create(createGiftDto);
    return {
      message: GIFT_MESSAGES.CREATE_SUCCESS,
      data: gift,
    };
  }

  @Get()
  async findAll(@Query() query: GetGiftsQueryDto) {
    const result = await this.giftsService.findAll(query);
    return {
      message: GIFT_MESSAGES.GET_LIST_SUCCESS,
      data: result.items,
      meta: result.meta,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const gift = await this.giftsService.findOne(id);
    return {
      message: GIFT_MESSAGES.GET_ONE_SUCCESS,
      data: gift,
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateGiftDto: UpdateGiftDto) {
    const gift = await this.giftsService.update(id, updateGiftDto);
    return {
      message: GIFT_MESSAGES.UPDATE_SUCCESS,
      data: gift,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.giftsService.remove(id);
  }
}
