import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { QueryTaskDto } from '../dtos/query-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

import { Task } from '../entities/task.entity';
import { TaskService } from '../services/task.service';

@Controller('api/v1/tasks')
export class TaskController {
  constructor(private _taskService: TaskService) {}

  @Get()
  getAll(): Promise<Task[]> {
    console.log('Consultando');
    return this._taskService.getAll();
  }

  @Get('query')
  findById(@Query() query: QueryTaskDto): Promise<Task[]> {
    return this._taskService.findByQuery(query);
  }

  @Get(':taskId')
  getById(@Param('taskId') taskId: string): Promise<Task> {
    return this._taskService.getById(taskId);
  }

  @Post()
  create(@Body() task: CreateTaskDto): Promise<Task> {
    return this._taskService.create(task);
  }

  @Patch(':taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() task: UpdateTaskDto,
  ): Promise<Task> {
    return this._taskService.update(taskId, task);
  }

  @Delete(':taskId')
  delete(@Param('taskId') taskId: string): Promise<boolean> {
    return this._taskService.delete(taskId);
  }
}
