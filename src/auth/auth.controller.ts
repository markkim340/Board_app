import { SignInUserDto } from './dto/signin-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@ApiResponse({ status: 500, description: 'Server Error' })
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse({ description: '회원가입 성공' })
  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiCreatedResponse({
    schema: {
      example: {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzb3J5NTMzOUBnbWFpbC5jb20iLCJzdWIiOjEsImlhdCI6MTY0NzgyMjQxMCwiZXhwIjoxNjQ3ODIyNDcwfQ.NpWT0a2VxTLPqbl3ZHwqlNYh4Rwwhv0p0WWgUpaY3CE',
      },
      description: '로그인 성공',
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('/signin')
  signIn(
    @Body() signInUserDto: SignInUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(signInUserDto);
  }
}
