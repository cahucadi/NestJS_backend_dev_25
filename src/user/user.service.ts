import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDTO } from './dto/login_user.dto';
import { UserDTO } from './dto/user.dto';
import { UserEntity } from './models/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto/create_user.dto';


@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>  ){}


    async getUser(options?: object):Promise<UserDTO>{
        const userEntity = await this.userRepository.findOne(options);
        return this.userEntityToUserDTO(userEntity);
    }

    async getUserByCredentials( {username,password}: LoginUserDTO ):Promise<UserDTO>{

        const user = await this.userRepository.findOne({where : { username }});
        
        if(!user){
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const samePassword = await bcrypt.compare(password, user.password);

        if(!samePassword){
            throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
        }

        return this.userEntityToUserDTO(user);
    }

    
    async findByPayload( {username}: any ):Promise<UserDTO>{
        const user = await this.getUser({where:{username}});
        return user;
    }


    async createUser(createUserDTO: CreateUserDTO):Promise<UserDTO>{

        const { username, password, email } = createUserDTO;
        
        const foundUser = await this.userRepository.findOne({ where: {username} });

        if(foundUser){
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const user = await this.userRepository.create({ username, password, email});
        await this.userRepository.save(user);
        return this.userEntityToUserDTO(user);
    }

    userEntityToUserDTO(userEntity: UserEntity ):UserDTO{
        const { id, username, email, updatedAt, active } = userEntity;
        let user:UserDTO = { id, username, email, updatedAt, active };
        return user;
    }

}
