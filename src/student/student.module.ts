import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './schemas/student.schema';

@Module({
  imports: [ ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
