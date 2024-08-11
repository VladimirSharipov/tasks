import { Module } from '@nestjs/common';
import { TaskFieldsService } from './task-fields.service';
import { TaskFieldsController } from './task-fields.controller';
import { PrismaService } from 'src/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  controllers: [TaskFieldsController],
  providers: [TaskFieldsService, PrismaService, ProjectsService],
  exports: [TaskFieldsService]
})
export class TaskFieldsModule { }
