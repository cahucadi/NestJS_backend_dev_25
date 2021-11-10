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

    getStudents(): Observable<IStudent[]>{
        const students = from(this.studentRepository.find());
        return students;
    }

    getStudentById(studentId: string): Observable<IStudent> {
        const student = from(this.studentRepository.findOne(studentId));
        return student;
    }

    createStudent(createStudentDTO: CreateStudentDTO): Observable<IStudent> {
        const student = from(this.studentRepository.save(createStudentDTO));
        return student;
    }

    updateStudent(studentId: string, createStudentDTO: CreateStudentDTO): Observable<any> {
        const updatedStudent = from(this.studentRepository.update(studentId, createStudentDTO));
        return updatedStudent;
    }

    deleteStudent(studentId: string): Observable<any> {
        const deletedStudent = from(this.studentRepository.delete(studentId));
        return deletedStudent;
    }


}
