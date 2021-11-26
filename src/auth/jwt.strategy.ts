import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserDTO } from "src/user/dto/user.dto";
import { AuthService } from "./auth.service";
import { IJwtPayload } from "./interfaces/jwt_payload.interface";

import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret'
        });
    }

    
    async validate(payload: IJwtPayload):Promise<UserDTO>{

        const user = await this.authService.validateUser(payload);

        if(!user){
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

}