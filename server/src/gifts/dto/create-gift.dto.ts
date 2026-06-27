import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateGiftDto {
  @ApiProperty({
    example: 'Voucher Shopee 100k',
    description: 'Tên quà tặng',
  })
  @IsString()
  @IsNotEmpty({ message: 'Tên quà tặng không được để trống' })
  @MaxLength(255, { message: 'Tên quà tặng tối đa 255 ký tự' })
  name: string;

  @ApiProperty({
    example: 'Voucher giảm giá 100.000đ trên Shopee',
    description: 'Mô tả quà tặng (tùy chọn, mặc định rỗng)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000, { message: 'Mô tả quà tặng tối đa 2000 ký tự' })
  description?: string;

  @ApiProperty({
    example: 50,
    description: 'Số điểm cần để đổi quà (≥ 0)',
    minimum: 0,
  })
  @IsInt({ message: 'Điểm quy đổi phải là số nguyên' })
  @Min(0, { message: 'Điểm quy đổi phải lớn hơn hoặc bằng 0' })
  point: number;

  @ApiProperty({
    example: 100,
    description: 'Số lượng quà có sẵn (≥ 0)',
    minimum: 0,
  })
  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(0, { message: 'Số lượng phải lớn hơn hoặc bằng 0' })
  quantity: number;
}
