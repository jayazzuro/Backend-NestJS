import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateGiftDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên quà tặng không được để trống' })
  @MaxLength(255, { message: 'Tên quà tặng tối đa 255 ký tự' })
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000, { message: 'Mô tả quà tặng tối đa 2000 ký tự' })
  description?: string;

  @IsInt({ message: 'Điểm quy đổi phải là số nguyên' })
  @Min(0, { message: 'Điểm quy đổi phải lớn hơn hoặc bằng 0' })
  point: number;

  @IsInt({ message: 'Số lượng phải là số nguyên' })
  @Min(0, { message: 'Số lượng phải lớn hơn hoặc bằng 0' })
  quantity: number;
}
