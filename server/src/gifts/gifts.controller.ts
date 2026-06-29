import { Controller, Get, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';

import { GetGiftsQueryDto } from './dto/get-gifts-query.dto';
import { GiftsService } from './gifts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GIFT_MESSAGES } from '../common/constants/messages.constant';

@UseGuards(JwtAuthGuard)
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

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
      message: GIFT_MESSAGES.GET_ONE_DETAIL_SUCCESS,
      data: gift,
    };
  }
}

