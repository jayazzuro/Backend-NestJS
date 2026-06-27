import { Controller, Get, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiParam,
} from '@nestjs/swagger';

import { GiftsService } from './gifts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetGiftsQueryDto } from './dto/get-gifts-query.dto';

@ApiTags('Gifts')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Get()
  @ApiOperation({
    summary: 'Danh sách quà hệ thống',
    description: 'Lấy danh sách quà tặng có phân trang và tìm kiếm theo tên',
  })
  @ApiOkResponse({ description: 'Danh sách quà tặng kèm metadata phân trang' })
  @ApiUnauthorizedResponse({ description: 'Chưa đăng nhập' })
  async findAll(@Query() query: GetGiftsQueryDto) {
    const result = await this.giftsService.findAll(query);
    return {
      message: 'Lấy danh sách quà tặng thành công',
      data: result.items,
      meta: result.meta,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Chi tiết quà tặng',
    description: 'Xem thông tin chi tiết một quà tặng theo ID',
  })
  @ApiParam({ name: 'id', description: 'ID của quà tặng', example: 1 })
  @ApiOkResponse({ description: 'Thông tin chi tiết quà tặng' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy quà tặng' })
  @ApiUnauthorizedResponse({ description: 'Chưa đăng nhập' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const gift = await this.giftsService.findOne(id);
    return {
      message: 'Lấy thông tin chi tiết quà tặng thành công',
      data: gift,
    };
  }
}
