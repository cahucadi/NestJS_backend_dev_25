import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDTO } from './dto/create_product.dto';
import { IProduct } from './interfaces/product.interface';

@Injectable()
export class ProductService {

    constructor( ){
    }

    async getProducts():Promise<IProduct[]>{

        return null;
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<IProduct>{
        return null;
    }
    

}
