import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todosRepository: Repository<Todo>,
  ) {}
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todosRepository.create(createTodoDto);
    return this.todosRepository.save(newTodo);
  }
  async list(): Promise<Todo[]> {
    return this.todosRepository.find();
  }
  async findById(id: string): Promise<Todo> {
    return this.todosRepository.findOneBy({ id });
  }
  async listFiltered(filteredTodoDto: FilterTodoDto) {
    const { status } = filteredTodoDto;
    return this.todosRepository
      .createQueryBuilder()
      .select('todo')
      .from(Todo, 'todo')
      .where('todo.status = :status', { status })
      .getMany();
  }
  async update(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<UpdateResult> {
    return this.todosRepository.update(id, updateTodoDto);
  }
  async remove(id: string): Promise<DeleteResult> {
    return this.todosRepository.delete({ id });
  }
}
