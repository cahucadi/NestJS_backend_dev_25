import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CreateProductDTO } from './dto/create_product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get()
    async getProductsList(@Res() res){
        const products = await this.productService.getProducts();

        return res.status(HttpStatus.OK).json(
            {
                message: 'Products listed',
                data: products
            }
        );
    }

    @Post('create')
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO ){
        const product =  await this.productService.createProduct(createProductDTO);
        return res.status(HttpStatus.CREATED).json(
            {
                message: 'Product Created',
                data: product
            }
        );
    }

}
