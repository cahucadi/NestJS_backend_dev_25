import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/dto/create_user.dto';
import { LoginUserDTO } from 'src/user/dto/login_user.dto';
import { UserDTO } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from './interfaces/jwt_payload.interface';
import { ILoginStatus } from './interfaces/login_status.interface';
import { IRegistrationStatus } from './interfaces/registration_status.interfaces';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}


    async register(createUserDTO: CreateUserDTO):Promise<IRegistrationStatus>{
        
        let status: IRegistrationStatus = {
                success: true,
                message: 'user registered'
        };

        try{
            await this.userService.createUser(createUserDTO);
        }catch(err){
            status = {
                success: false,
                message: err
            };
        }

        return status;

    }

    
    async login(loginUserDTO:LoginUserDTO): Promise<ILoginStatus>{

        const user = await this.userService.getUserByCredentials(loginUserDTO);

        const expiresIn = process.env.EXPIRES_IN;        
        const accessToken = this.jwtService.sign(user);
        

        let token: ILoginStatus  = {
            id: user.id,
            username: user.username,
            role: user.role,
            expiresIn,
            accessToken
        };

        return token;

    }

    
    async validateUser(payload : IJwtPayload): Promise<UserDTO>{

        const user = await this.userService.findByPayload(payload);

        if(!user){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

}
