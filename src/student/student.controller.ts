import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { StudentService } from './student.service';
import {CreateStudentDTO} from './dto/create_student.dto';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService){}

    @Get()
    async getStudents(@Res() res){
        const students = await this.studentService.getStudents();
        return res.status(HttpStatus.OK).json({
            data : students
        });
    }

    @Get('/:studentId')
    async getStudent(@Res() res, @Param('studentId') id ){
        const student = await this.studentService.getStudentById(id);

        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message:'found',
            data: student
        });
    }

    @Post('/create')
    async createStudent(@Res() res, @Body() createStudentDTO: CreateStudentDTO ){

        const student = await this.studentService.createStudent(createStudentDTO);

        return res.status(HttpStatus.CREATED).json({ 
            message: 'recieved',
            data: student 
        });
    }


    @Put('/update/:studentId')
    async updateStudent(@Res() res, @Body() createStudentDTO: CreateStudentDTO, @Param('studentId') id ){

        const student = await this.studentService.updateStudent(id, createStudentDTO);

        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message:'Student updated successfully',
            data: student
        });

    }


    @Delete('/delete')
    async deleteStudent(@Res() res , @Query('studentId') id){
        const student = await this.studentService.deleteStudent(id);

        if(!student){
            throw new NotFoundException('Student does not exists');
        }

        return res.status(HttpStatus.OK).json({
            message:'deleted',
            data: student
        });

    }

    enrollStundet(){

    }
    
}
