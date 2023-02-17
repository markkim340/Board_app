import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialDto {
  @IsEmail()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  nickname: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'password only accepts english and number',
  })
  password: string;
}
