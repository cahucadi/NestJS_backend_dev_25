import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[
    UserModule,
    TypeOrmModule.forFeature([ProductEntity, UserEntity])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}

