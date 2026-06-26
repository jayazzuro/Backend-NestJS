import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateGiftDto {
  @ApiProperty({
    example: 'Voucher Grab 50k',
    description: 'Tên quà tặng mới (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Voucher giảm giá 50.000đ trên Grab',
    description: 'Mô tả quà tặng (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 30,
    description: 'Số điểm cần để đổi quà (tùy chọn, ≥ 0)',
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  point?: number;

  @ApiProperty({
    example: 50,
    description: 'Số lượng quà (tùy chọn, ≥ 0)',
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;
}
