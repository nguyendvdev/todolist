import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTaskBody } from './dto/create-task.body.dto';
import { UpdateTaskBody } from './dto/update-task.body.dto';
import { TaskService } from './task.service';

@Controller('')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('task')
  async createTask(@Body() body: CreateTaskBody) {
    return await this.taskService.createTask(body);
  }

  @Get('tasks')
  async getTasks() {
    return await this.taskService.getTasks();
  }

  @Get('task/:id')
  async getTask(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return await this.taskService.getTask(id);
  }

  @Put('task/:id')
  async updateTask(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() body: UpdateTaskBody,
  ) {
    return await this.taskService.updateTask(id, body);
  }

  @Delete('task/:id')
  async deleteTask(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    return await this.taskService.deleteTask(id);
  }
}
