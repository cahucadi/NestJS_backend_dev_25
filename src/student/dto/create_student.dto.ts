import { IStudent } from "../interfaces/student.interface";

export class CreateStudentDTO implements IStudent{
    
    readonly code : number;
    readonly name : string;
    readonly photoURL : string;
    readonly createdAt : Date;

}