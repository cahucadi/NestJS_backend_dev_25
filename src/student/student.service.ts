import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IStudent } from './interfaces/student.interface';
import { CreateStudentDTO } from './dto/create_student.dto';
@Injectable()
export class StudentService {

    constructor( @InjectModel('Student') private readonly studentModel: Model<IStudent> ){}

    async getStudents(): Promise<IStudent[]>{
        const students = await this.studentModel.find().sort({name: -1});
        return students; 
    }

    async getStudentById(studentId: string): Promise<IStudent> {
        const student = await this.studentModel.findById(studentId);
        return student;
    }

    async createStudent(createStudentDTO: CreateStudentDTO): Promise<IStudent> {
        const student = new this.studentModel(createStudentDTO);
        await student.save();
        return student;
    }

    async updateStudent(studentId: string, createStudentDTO: CreateStudentDTO): Promise<IStudent> {
        const updatedStudent = await this.studentModel.findByIdAndUpdate(studentId, createStudentDTO, { new: true } );
        return updatedStudent;
    }

    async deleteStudent(studentId: string): Promise<IStudent> {
        const deletedStudent = this.studentModel.findByIdAndDelete(studentId);
        return deletedStudent;
    }


}
