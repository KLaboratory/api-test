import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { CreateTaskDto } from '../dtos/create-task.dto';
import { QueryTaskDto } from '../dtos/query-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

import { Task } from '../entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly _repository: Repository<Task>,
  ) {}

  getAll(): Promise<Task[]> {
    return this._repository.createQueryBuilder('task').getMany();
  }

  getById(taskId: string): Promise<Task> {
    return this._repository
      .createQueryBuilder('task')
      .where(`task.taskId = :taskId`, { taskId })
      .getOne();
  }

  findByQuery(query: QueryTaskDto): Promise<Task[]> {
    const alias = 'task';
    const queryBuilder = this._repository.createQueryBuilder(alias);
    this._addFilterToQuery(query, queryBuilder, alias);
    return queryBuilder.getMany();
  }

  create(task: CreateTaskDto): Promise<Task> {
    const newTask = this._repository.create(task);
    return this._repository.save(newTask);
  }

  async update(taskId: string, task: UpdateTaskDto): Promise<Task> {
    const foundTask = await this.getById(taskId);

    if (!foundTask) {
      throw new Error(`No found task with id ${taskId}`);
    }

    await this._repository.update(taskId, task);
    return this.getById(taskId);
  }

  async delete(taskId: string): Promise<boolean> {
    const foundTask = await this.getById(taskId);

    if (foundTask) {
      await this._repository.remove(foundTask);
      return true;
    }
    return false;
  }

  private _addFilterToQuery(
    filter: QueryTaskDto,
    query: SelectQueryBuilder<Task>,
    alias: string,
  ): void {
    const { name } = filter;

    // Filter by name
    if (name) {
      query.andWhere(`LOWER(${alias}.name) LIKE :name`, {
        name: `%${name.toLowerCase()}%`,
      });
    }
  }
}
