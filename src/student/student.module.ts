import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './models/student.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [ 
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([StudentEntity]) ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
