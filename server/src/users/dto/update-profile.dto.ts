import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'new_username',
    description: 'Tên đăng nhập mới (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @IsNotEmpty({ message: 'Tên đăng nhập không được để trống' })
  @MaxLength(100, { message: 'Tên đăng nhập tối đa 100 ký tự' })
  username?: string;

  @ApiProperty({
    example: 'newemail@example.com',
    description: 'Email mới (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Mật khẩu mới (tùy chọn, tối thiểu 6 ký tự)',
    required: false,
    minLength: 6,
  })
  @IsOptional()
  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  password?: string;
}
