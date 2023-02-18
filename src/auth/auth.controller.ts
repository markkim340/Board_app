import { SignInUserDto } from './dto/signin-user.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ description: '회원가입 완료' })
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({ description: '로그인 완료' })
  @Post('/signin')
  signIn(
    @Body() signInUserDto: SignInUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(signInUserDto);
  }
}
