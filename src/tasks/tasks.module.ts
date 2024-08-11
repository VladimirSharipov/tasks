import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma.service';
import { StatusesService } from 'src/statuses/statuses.service';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, StatusesService, ProjectsService],
  exports: [TasksService]
})
export class TasksModule { }
