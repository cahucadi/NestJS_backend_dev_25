import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from 'src/user/dto/create_user.dto';
import { LoginUserDTO } from 'src/user/dto/login_user.dto';
import { AuthService } from './auth.service';
import { Role } from './guards/role.decorator';
import { RoleGuard } from './guards/role.guard';
import { IJwtPayload } from './interfaces/jwt_payload.interface';
import { ILoginStatus } from './interfaces/login_status.interface';
import { IRegistrationStatus } from './interfaces/registration_status.interfaces';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    @UsePipes(new ValidationPipe())
    public async register(@Body() createUserDTO: CreateUserDTO ): Promise<IRegistrationStatus>{
        
        const result:IRegistrationStatus = await this.authService.register(createUserDTO);

        if(!result.success){
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST );
        }

        return result;
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    public async login(@Body() loginUserDTO: LoginUserDTO ): Promise<ILoginStatus>{
        const result:ILoginStatus = await this.authService.login(loginUserDTO);
        return result;
    }

    @Get('whoami')
    @Role('ADMIN','AUTHUSER')
    @UseGuards(AuthGuard(), RoleGuard)
    public async testAuth(@Req() req: any):Promise<IJwtPayload>{
        return req.user;
    }

}
