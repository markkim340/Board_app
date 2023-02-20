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
    description: '4자리 이상 20자리 이하의 이메일 형식',
  })
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiProperty({
    example: 'testman',
    description: '4자리 이상 20자리 이하의 문자',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  nickname: string;

  @ApiProperty({
    example: 'test1234@',
    description: '8자리 이상 16자리 이하의 비밀번호 형식',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  @Matches(/^[A-Za-z\d@$!%*?&]{8,16}$/, {
    message: '비밀번호 양식에 맞게 작성하세요.',
  })
  password: string;
}
