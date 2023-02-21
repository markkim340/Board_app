import { User } from './user.entity';
import { UserRepository } from './auth.repository';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    private configService;
    constructor(userRepository: UserRepository, configService: ConfigService);
    validate(payload: any): Promise<User>;
}
export {};
