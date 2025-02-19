import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateTaskBody } from './dto/create-task.body.dto';
import { UpdateTaskBody } from './dto/update-task.body.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(body: CreateTaskBody) {
    return await this.prisma.task.create({
      data: { title: body.title },
    });
  }

  async getTasks() {
    return await this.prisma.task.findMany();
  }

  async getTask(id: number) {
    return await this.prisma.task.findUniqueOrThrow({
      where: { id },
    });
  }

  async updateTask(id: number, body: UpdateTaskBody) {
    return await this.prisma.task.update({
      where: { id },
      data: { status: body.status },
    });
  }

  async deleteTask(id: number) {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
