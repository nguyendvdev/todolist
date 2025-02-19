import { TASK_STATUS } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateTaskBody {
  @IsEnum(TASK_STATUS)
  status: TASK_STATUS;
}
