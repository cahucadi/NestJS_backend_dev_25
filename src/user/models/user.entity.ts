import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Role } from "./user.enum";
import { ProductEntity } from "src/product/entities/product.entity";

@Entity("users")
export class UserEntity {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false})
    email: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({nullable: true, default: true})
    active: boolean;

    @Column({nullable: true, default: Role.AUTHUSER})
    role: Role;

    @OneToMany(type => ProductEntity, product => product.user )
    products: ProductEntity[];

    @BeforeInsert() async hashPassword(){
        this.password = await bcrypt.hash(this.password , 10);
    }

    
}