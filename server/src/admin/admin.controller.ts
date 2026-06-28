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
      message: 'Tạo quà tặng thành công',
      data: gift,
    };
  }

  @Get()
  async findAll(@Query() query: GetGiftsQueryDto) {
    const result = await this.giftsService.findAll(query);
    return {
      message: 'Lấy danh sách quà tặng thành công',
      data: result.items,
      meta: result.meta,
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const gift = await this.giftsService.findOne(id);
    return {
      message: 'Lấy thông tin quà tặng thành công',
      data: gift,
    };
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateGiftDto: UpdateGiftDto) {
    const gift = await this.giftsService.update(id, updateGiftDto);
    return {
      message: 'Cập nhật quà tặng thành công',
      data: gift,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.giftsService.remove(id);
    return {
      message: 'Xóa quà tặng thành công',
    };
  }
}
