import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    StudentModule, 
    MongooseModule.forRoot('mongodb+srv://root:root@cluster0.e8gkf.mongodb.net/db_gr_25',{
      useNewUrlParser: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
