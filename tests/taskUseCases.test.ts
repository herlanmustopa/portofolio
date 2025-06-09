import { describe, it, expect } from 'vitest';
import { InMemoryTaskRepository } from '@/infrastructure/repositories/InMemoryTaskRepository';
import { AddTask } from '@/application/usecases/AddTask';
import { GetTasks } from '@/application/usecases/GetTasks';

describe('Task use cases', () => {
  it('should add a task and retrieve it', async () => {
    const repo = new InMemoryTaskRepository();
    const addTask = new AddTask(repo);
    const getTasks = new GetTasks(repo);

    await addTask.execute('Test Task');
    const tasks = await getTasks.execute();

    expect(tasks.length).toBe(1);
    expect(tasks[0].title).toBe('Test Task');
  });
});
