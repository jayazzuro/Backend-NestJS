import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'new_username',
    description: 'Tên đăng nhập mới (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    example: 'newemail@example.com',
    description: 'Email mới (tùy chọn)',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: 'newpassword123',
    description: 'Mật khẩu mới (tùy chọn, tối thiểu 6 ký tự)',
    required: false,
    minLength: 6,
  })
  @IsOptional()
  @MinLength(6)
  password?: string;
}
