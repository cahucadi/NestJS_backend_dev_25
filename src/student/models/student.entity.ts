import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class StudentEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: number;
    
    @Column()
    name: string;
    
    @Column()
    photoURL: string;
    
    @Column()
    createdAt: Date;


}