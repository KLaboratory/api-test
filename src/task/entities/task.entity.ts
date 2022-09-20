import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('test.tt_task')
export class Task {
  @PrimaryGeneratedColumn({
    name: 'task_id',
    type: 'bigint',
  })
  taskId: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'description', type: 'varchar' })
  description: string;
}
