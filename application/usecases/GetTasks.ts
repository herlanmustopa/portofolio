import { Task } from "@/domain/entities/Task";
import { TaskRepository } from "@/domain/repositories/TaskRepository";

export class GetTasks {
  constructor(private repo: TaskRepository) {}

  async execute(): Promise<Task[]> {
    return this.repo.findAll();
  }
}
