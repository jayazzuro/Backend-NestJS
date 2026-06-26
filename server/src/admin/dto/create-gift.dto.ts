import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, Min, IsOptional } from 'class-validator';

export class CreateGiftDto {
  @ApiProperty({
    example: 'Voucher Shopee 100k',
    description: 'Tên quà tặng',
  })
  @IsString()
  @IsNotEmpty({ message: 'Tên quà tặng không được để trống' })
  name: string;

  @ApiProperty({
    example: 'Voucher giảm giá 100.000đ trên Shopee',
    description: 'Mô tả quà tặng (tùy chọn)',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 50,
    description: 'Số điểm cần để đổi quà (≥ 0)',
    minimum: 0,
  })
  @IsInt()
  @Min(0, { message: 'Điểm quy đổi phải lớn hơn hoặc bằng 0' })
  point: number;

  @ApiProperty({
    example: 100,
    description: 'Số lượng quà có sẵn (≥ 0)',
    minimum: 0,
  })
  @IsInt()
  @Min(0, { message: 'Số lượng phải lớn hơn hoặc bằng 0' })
  quantity: number;
}
