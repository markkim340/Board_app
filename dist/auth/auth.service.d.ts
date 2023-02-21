import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(createUserDto: CreateUserDto): Promise<void>;
    signIn(signInUserDto: any): Promise<{
        access_token: string;
    }>;
}
