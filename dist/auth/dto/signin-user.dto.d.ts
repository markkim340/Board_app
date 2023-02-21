import { CreateUserDto } from './create-user.dto';
declare const SignInUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class SignInUserDto extends SignInUserDto_base {
    email: string;
    password: string;
}
export {};
