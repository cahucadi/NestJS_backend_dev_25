import { Injectable } from '@nestjs/common';
import { IStudent } from './interfaces/student.interface';
import { CreateStudentDTO } from './dto/create_student.dto';
import { from, Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './models/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {

    constructor(@InjectRepository(StudentEntity) private readonly studentRepository: Repository<StudentEntity>){}

    async getStudents(): Promise<IStudent[]>{
        const students = await this.studentRepository.find();
        return students;
    }

    async getStudentById(studentId: string): Promise<IStudent> {
        const student = await this.studentRepository.findOne(studentId);
        return student;
    }

    async createStudent(createStudentDTO: CreateStudentDTO): Promise<IStudent> {
        const student = await this.studentRepository.save(createStudentDTO);
        return student;
    }

    async updateStudent(studentId: string, createStudentDTO: CreateStudentDTO): Promise<any> {
        await this.studentRepository.update(studentId, createStudentDTO);
        const updatedStudent = await this.studentRepository.findOne(studentId);
        return updatedStudent;
    }

    async deleteStudent(studentId: string): Promise<any> {
        const deletedStudent =  await this.studentRepository.findOne(studentId);
        await this.studentRepository.delete(studentId);
        return deletedStudent;
    }


}
