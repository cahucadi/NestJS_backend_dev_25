import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports:[
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property:'user',
            session: false
        }),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: 3600 }
        })
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports:[PassportModule, JwtModule]
})

export class AuthModule {}
