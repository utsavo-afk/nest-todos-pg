import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn('uuid', { name: 'todo_id' })
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.OPEN })
  status: TodoStatus;
}
