import { Controller, Get, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';

import { GetGiftsQueryDto } from './dto/get-gifts-query.dto';
import { GiftsService } from './gifts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

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
      message: 'Lấy thông tin chi tiết quà tặng thành công',
      data: gift,
    };
  }
}
