import { Module } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { StatusesController } from './statuses.controller';
import { PrismaService } from 'src/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Module({
  controllers: [StatusesController],
  providers: [StatusesService, PrismaService, ProjectsService],
  exports: [StatusesService]
})
export class StatusesModule { }
