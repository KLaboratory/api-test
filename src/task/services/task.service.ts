import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { QueryTaskDto } from '../dtos/query-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly _taskReposiory: TaskRepository) {}

  getAll(): Promise<Task[]> {
    return this._taskReposiory.getAll();
  }

  getById(taskId: string): Promise<Task> {
    return this._taskReposiory.getById(taskId);
  }

  findByQuery(query: QueryTaskDto): Promise<Task[]> {
    return this._taskReposiory.findByQuery(query);
  }

  create(task: CreateTaskDto): Promise<Task> {
    return this._taskReposiory.create(task);
  }

  update(taskId: string, task: UpdateTaskDto): Promise<Task> {
    return this._taskReposiory.update(taskId, task);
  }

  delete(taskId: string): Promise<boolean> {
    return this._taskReposiory.delete(taskId);
  }
}
