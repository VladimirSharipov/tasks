import { Module } from '@nestjs/common';
import { TaskFieldValuesService } from './task-field-values.service';
import { TaskFieldValuesController } from './task-field-values.controller';
import { PrismaService } from 'src/prisma.service';
import { TaskFieldsService } from 'src/task-fields/task-fields.service';
import { ProjectsService } from 'src/projects/projects.service';
import { TasksService } from 'src/tasks/tasks.service';
import { StatusesService } from 'src/statuses/statuses.service';

@Module({
  controllers: [TaskFieldValuesController],
  providers: [TaskFieldValuesService, PrismaService, TaskFieldsService, ProjectsService, TasksService, StatusesService],
})
export class TaskFieldValuesModule { }
