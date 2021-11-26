import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    StudentModule, 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bssxtjgyzc1ispjs41gs-mysql.services.clever-cloud.com',
      port: 3306,
      username: 'ukhf2ngbvmifshyf',
      password: '785covRvsBbjrNnvUegr',
      database: 'bssxtjgyzc1ispjs41gs',
      autoLoadEntities: true
    }),
    UserModule,
    AuthModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
