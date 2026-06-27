import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class GetGiftsQueryDto {
  @ApiProperty({
    example: 1,
    description: 'Trang hiện tại',
    required: false,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    example: 10,
    description: 'Số lượng item mỗi trang',
    required: false,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100, { message: 'Số lượng item mỗi trang tối đa 100' })
  limit?: number = 10;

  @ApiProperty({
    example: 'voucher',
    description: 'Tìm kiếm theo tên quà (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
