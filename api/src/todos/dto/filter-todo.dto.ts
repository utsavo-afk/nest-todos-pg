import { IsEnum, IsOptional } from 'class-validator';
import { TodoStatus } from '../todo.entity';

export class FilterTodoDto {
  @IsOptional()
  @IsEnum(TodoStatus)
  status: TodoStatus;
}
