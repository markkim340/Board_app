import { SignInUserDto } from './dto/signin-user.dto';
import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const { email, nickname, password } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return await this.userRepository.createUser(
      email,
      nickname,
      hashedPassword,
    );
  }

  async signIn(signInUserDto): Promise<{ accessToken: string }> {
    const { email, password } = signInUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { password },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      //유저토큰생성 (Secret + Payload)
      const payload = { email };
      const accessToken = this.jwtService.sign(payload);

      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('logIn failed');
    }
  }
}
