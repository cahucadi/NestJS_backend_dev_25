import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    StudentModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test_mysql',
      entities: [],
      synchronize: true,
    }),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
