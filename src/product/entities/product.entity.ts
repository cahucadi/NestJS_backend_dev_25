import { UserEntity } from "src/user/models/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( {length: 100})
    name: string;

    // n : 1 relation with User
    @ManyToOne(type => UserEntity, user => user.products )
    user: UserEntity;
}
