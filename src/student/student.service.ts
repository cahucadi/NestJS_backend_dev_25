import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IStudent } from './interfaces/student.interface';
import { CreateStudentDTO } from './dto/create_student.dto';
@Injectable()
export class StudentService {

    constructor(){}

    async getStudents(): Promise<IStudent[]>{
        return null;
    }

    async getStudentById(studentId: string): Promise<IStudent> {
        return null;
    }

    async createStudent(createStudentDTO: CreateStudentDTO): Promise<IStudent> {
        return null;
    }

    async updateStudent(studentId: string, createStudentDTO: CreateStudentDTO): Promise<IStudent> {
        return null;
    }

    async deleteStudent(studentId: string): Promise<IStudent> {
        return null;
    }


}
