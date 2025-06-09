import { Task } from "@/domain/entities/Task";

export interface TaskRepository {
  create(task: Task): Promise<Task>;
  findAll(): Promise<Task[]>;
}
