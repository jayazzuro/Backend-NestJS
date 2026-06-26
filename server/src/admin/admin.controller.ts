import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiParam,
} from '@nestjs/swagger';

import { AdminService } from './admin.service';
import { CreateGiftDto } from './dto/create-gift.dto';
import { UpdateGiftDto } from './dto/update-gift.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@ApiTags('Admin - Gifts')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin/gifts')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({
    summary: 'Tạo quà tặng mới',
    description: 'Chỉ ADMIN mới được tạo quà',
  })
  @ApiCreatedResponse({ description: 'Tạo quà thành công' })
  @ApiUnauthorizedResponse({ description: 'Chưa đăng nhập' })
  @ApiForbiddenResponse({ description: 'Không có quyền ADMIN' })
  async create(@Body() createGiftDto: CreateGiftDto) {
    const gift = await this.adminService.createGift(createGiftDto);
    return {
      message: 'Tạo quà tặng thành công',
      data: gift,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'Danh sách tất cả quà (admin)',
    description: 'Chỉ ADMIN mới xem được toàn bộ danh sách',
  })
  @ApiOkResponse({ description: 'Danh sách quà tặng' })
  @ApiUnauthorizedResponse({ description: 'Chưa đăng nhập' })
  @ApiForbiddenResponse({ description: 'Không có quyền ADMIN' })
  async findAll() {
    const gifts = await this.adminService.findAllGifts();
    return {
      message: 'Lấy danh sách quà tặng thành công',
      data: gifts,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Chi tiết quà (admin)',
    description: 'Xem chi tiết một quà tặng theo ID',
  })
  @ApiParam({ name: 'id', description: 'ID quà tặng', example: 1 })
  @ApiOkResponse({ description: 'Thông tin chi tiết quà tặng' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy quà tặng' })
  @ApiUnauthorizedResponse({ description: 'Chưa đăng nhập' })
  @ApiForbiddenResponse({ description: 'Không có quyền ADMIN' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const gift = await this.adminService.findGiftById(id);
    return {
      message: 'Lấy thông tin quà tặng thành công',
      data: gift,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Cập nhật quà tặng',
    description: 'Cập nhật một phần hoặc toàn bộ thông tin quà tặng',
  })
  @ApiParam({ name: 'id', description: 'ID quà tặng', example: 1 })
  @ApiOkResponse({ description: 'Cập nhật thành công' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy quà tặng' })
  @ApiUnauthorizedResponse({ description: 'Chưa đăng nhập' })
  @ApiForbiddenResponse({ description: 'Không có quyền ADMIN' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGiftDto: UpdateGiftDto,
  ) {
    const gift = await this.adminService.updateGift(id, updateGiftDto);
    return {
      message: 'Cập nhật quà tặng thành công',
      data: gift,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Xóa quà tặng',
    description: 'Xóa vĩnh viễn một quà tặng khỏi hệ thống',
  })
  @ApiParam({ name: 'id', description: 'ID quà tặng', example: 1 })
  @ApiOkResponse({ description: 'Xóa thành công' })
  @ApiNotFoundResponse({ description: 'Không tìm thấy quà tặng' })
  @ApiUnauthorizedResponse({ description: 'Chưa đăng nhập' })
  @ApiForbiddenResponse({ description: 'Không có quyền ADMIN' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.adminService.deleteGift(id);
    return {
      message: 'Xóa quà tặng thành công',
    };
  }
}
