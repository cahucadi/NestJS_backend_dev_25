import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity> ,
    private readonly userService: UserService
    ){}


  async create(createProductDto: CreateProductDto) {
  

    const { name, userID } = createProductDto;
    const product = new ProductEntity();
    product.name = name;
    product.user = await this.userService.findById(userID);
    await this.productRepository.save(product);
    return product;  
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
