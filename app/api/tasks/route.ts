import { NextRequest, NextResponse } from 'next/server';
import { InMemoryTaskRepository } from '@/infrastructure/repositories/InMemoryTaskRepository';
import { AddTask } from '@/application/usecases/AddTask';
import { GetTasks } from '@/application/usecases/GetTasks';

// simple singleton repository instance
type RepoType = InMemoryTaskRepository;
const repo: RepoType = new InMemoryTaskRepository();

export async function GET() {
  const useCase = new GetTasks(repo);
  const tasks = await useCase.execute();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const { title } = await request.json();
  const useCase = new AddTask(repo);
  const task = await useCase.execute(title);
  return NextResponse.json(task, { status: 201 });
}
