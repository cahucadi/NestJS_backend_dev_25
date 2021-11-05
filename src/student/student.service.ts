import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IStudent } from './interfaces/student.interface';
import { CreateStudentDTO } from './dto/create_student.dto';
@Injectable()
export class StudentService {

    constructor( @InjectModel('Student') private readonly studentModel: Model<IStudent> ){}

    async getStudents(): Promise<IStudent[]>{
        const students = await this.studentModel.find();
        return students; 
    }

    async createStudent(createStudentDTO: CreateStudentDTO): Promise<IStudent> {
        const student = new this.studentModel(createStudentDTO);
        await student.save();
        return student;
    }


    updateStudent(){

    }

    deleteStudent(){

    }


}
