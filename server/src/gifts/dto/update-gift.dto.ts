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
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @IsNotEmpty({ message: 'Tên quà tặng không được để trống' })
  @MaxLength(255, { message: 'Tên quà tặng tối đa 255 ký tự' })
  name?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @MaxLength(2000, { message: 'Mô tả quà tặng tối đa 2000 ký tự' })
  description?: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt({ message: 'Điểm quy đổi phải là số nguyên' })
  @Min(0)
  point?: number;

  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(0)
  quantity?: number;
}
