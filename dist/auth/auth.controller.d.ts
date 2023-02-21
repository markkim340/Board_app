import { SignInUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<void>;
    signIn(signInUserDto: SignInUserDto): Promise<{
        access_token: string;
    }>;
}
