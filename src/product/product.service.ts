import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/create_product.dto';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel : Model<IProduct> ){
    }

    async getProducts():Promise<IProduct[]>{
        const products = await this.productModel.find();
        return products;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<IProduct>{
        const product = new this.productModel(createProductDTO);
        await product.save();
        return product;
    }
    

}
