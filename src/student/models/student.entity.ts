import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("students")
export class StudentEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    code: number;
    
    @Column()
    name: string;
    
    @Column({default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' })
    photoURL: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


}