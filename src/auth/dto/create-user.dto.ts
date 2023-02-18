import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: '이메일',
  })
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty({
    example: '익명의카멜레온',
    description: '닉네임',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  nickname: string;

  @ApiProperty({
    example: '1234qwer',
    description: '비밀번호',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  @Matches(/^[A-Za-z\d@$!%*?&]{8,16}$/, {
    message: '비밀번호 양식에 맞게 작성하세요. (8자리 이상 16자리 이하)',
  })
  password: string;
}
