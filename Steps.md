# Steps

1. Instalar typescript y nest/cli

```bash
npm install -g typescript
npm i -g @nestjs/cli
```

2. Crear proyecto en una carpeta
(Si quiero crear una carpeta con el proyecto en lugar . pongo el nombre de la carpeta)

```bash
nest new . 
```

3. Instalar dependencias e iniciar la ejecución del servidor

```bash
npm install
npm run start:dev
```

4. Instalar las librerías de la Base de datos (en este caso MongoDB)
**Dado que se está ejecutando el proyecto, todos los comandos de consola deben realizarse en una nueva ventana de consola**

```bash
npm install --save @nestjs/mongoose mongoose
npm install @types/mongoose -D
```

## Para cada módulo

5. Crear el módulo para la entidad que voy a desarrollar

```bash
nest generate module product 
```
También se puede colocar

```bash
nest g mo product 
```

6. Crear el controlador y el servicio
```bash
nest g co product
nest g s product
```

7. Crear el DTO

- Crear una carpeta "dto" dentro del modulo product
- Crear un archivo "create_product.dto.ts"

8. Crear la carpeta interfaces

- Crear una carpeta "interfaces" dentro del modulo product
- Crear un archivo "product.interface.ts"

9. Crear la carpeta schemas

- Crear una carpeta "schemas" dentro del modulo product
- Crear un archivo "product.schema.ts"


## Configurar la conexión a la BD
**(Esta sección se realiza UNA SOLA VEZ para el proyecto)**


10. Crear la BD y la colección en MongoAtlas

- Selecciono el Cluster (de forma predeterminada es Cluster0)
- Selecciono la pestaña "Colections"
- Creo una base de datos con nombre ZZZZZZ (+ Create Database)
- Seleciono la base de datos creada y creo una colección 
en la base de datos (Botón verde "Create") con el nombre products


11. Configurar en app.module.ts la Conexión a la base de datos
MongoDB utilizando MongooseModule

- En el archivo app.module.ts importamos 
```bash
import { MongooseModule } from '@nestjs/mongoose';
```

- En la sección "imports: [ ]" (separados por comas) agregamos:
```bash
    MongooseModule.forRoot('mongodb+srv://XXXXX:YYYYYY@cluster0.e8gkf.mongodb.net/ZZZZZZ',{
      useNewUrlParser: true
    }), 
```
Donde:
- XXXXXX es el usuario de la base de datos
- YYYYYY es la contraseña del usuario
- ZZZZZZ es la base de datos 

Nota: la URL de conexión 'mongodb+srv://....' se obtiene en el Botón 
"Connect", seleccionando "Connect your application"

## Implementar las funcionalidades de product

12. Actualizar el Schema de product product.schema.ts
 - Agregar los atributos que tendrá la colección

  ```bash
    import { Schema } from "mongoose";

    export const ProductSchema = new Schema({

        name: {type: String, required: true},
        description:  {type: String, required: true},
        price: Number,
        createdAt: {
            type: Date,
            default: Date.now
        }

    });
  ```

13. Actualizar el DTO y la interface con los campos a utilizar
 - Actualizar el DTO con los mismos atributos del Schema
 - Actualizar la interface con los mismos atribitos del Schema

Nota: el DTO y la interface tienen los mismos atributos del Schema para este escenario

14. Agregar a la interface el extends Document de mongoose
- Importar el Document de mongoose

```bash
import { Document } from "mongoose";
```
- Agregar a la interfaz IProduct la herencia "extends Document"

```bash
export interface IProduct extends Document{
```

## Implementar el servicio y el controlador

15. Configurar el módulo de product "product.module.ts"

  - Importar el MongooseModule y el Schema de product
    ```bash
        import { Module } from '@nestjs/common';
        import { MongooseModule } from '@nestjs/mongoose';
        import { ProductController } from './product.controller';
        import { ProductService } from './product.service';
        import { ProductSchema } from './schemas/product.schema';
    ```
  - Agregar en imports la configuración de la colección mediante Mongoose.forFeature quedan así:

    ```bash
    @Module({
      imports: [
        MongooseModule.forFeature([
          { name: 'Product', schema: ProductSchema}
        ])
      ],
      controllers: [ProductController],
      providers: [ProductService]
    })
    export class ProductModule {}
    ```

  16. Creamos las consultas (queries) en el servicio

  - Importar las librerías necesarias: El DTO, la interface, el Model y el InjectModel, entre otras

    ```bash
      import { Injectable } from '@nestjs/common';
      import { InjectModel } from '@nestjs/mongoose';
      import { Model } from 'mongoose';
      import { CreateProductDTO } from './dto/create_product.dto';
      import { IProduct } from './interfaces/product.interface';
    ```

  - Inyectar el modelo anteriormente definido en product.module.ts mediante el constructor

      ```bash
        constructor(@InjectModel('Product') private readonly productModel : Model<IProduct> ){ 
        }
      ```
  
  - Crear la consulta de listar

      ```bash
        async getProducts():Promise<IProduct[]>{
            const products = await this.productModel.find();
            return products;
        }
      ```
      Nota: productModel representa un Modelo o Elemento de la base de datos, por lo tanto
      tiene todas las operaciones para trabajar con la colección Products como listar (find),
      guardar (save) o eliminar (delete)

  - Crear la consulta de guardar

     ```bash
        async createProduct(createProductDTO: CreateProductDTO): Promise<IProduct>{
          const product = new this.productModel(createProductDTO);
          await product.save();
          return product;
        }

      ```

  17. Usar los servicios creados en el controlador product.controller.ts