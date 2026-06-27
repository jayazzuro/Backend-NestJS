import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';

export class UpdateGiftDto {
  @ApiProperty({
    example: 'Voucher Grab 50k',
    description: 'Tên quà tặng mới (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @IsNotEmpty({ message: 'Tên quà tặng không được để trống' })
  @MaxLength(255, { message: 'Tên quà tặng tối đa 255 ký tự' })
  name?: string;

  @ApiProperty({
    example: 'Voucher giảm giá 50.000đ trên Grab',
    description: 'Mô tả quà tặng (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @MaxLength(2000, { message: 'Mô tả quà tặng tối đa 2000 ký tự' })
  description?: string;

  @ApiProperty({
    example: 30,
    description: 'Số điểm cần để đổi quà (tùy chọn, ≥ 0)',
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt({ message: 'Điểm quy đổi phải là số nguyên' })
  @Min(0)
  point?: number;

  @ApiProperty({
    example: 50,
    description: 'Số lượng quà (tùy chọn, ≥ 0)',
    required: false,
    minimum: 0,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(0)
  quantity?: number;
}
