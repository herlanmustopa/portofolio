import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

export class InMemoryTaskRepository implements TaskRepository {
  private tasks: Task[] = [];

  async create(task: Task): Promise<Task> {
    this.tasks.push(task);
    return task;
  }

  async findAll(): Promise<Task[]> {
    return this.tasks;
  }
}
