import { IsNotEmpty } from "class-validator";

export class LoginUserDTO{
    @IsNotEmpty() readonly username: string;
    @IsNotEmpty() readonly password: string;
}