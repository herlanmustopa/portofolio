import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

export class AddTask {
  constructor(private repo: TaskRepository) {}

  async execute(title: string): Promise<Task> {
    const task: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
    };
    return this.repo.create(task);
  }
}
