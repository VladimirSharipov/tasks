import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectId, TaskFieldDto, TaskFieldId, UpdateTaskFieldDto } from './dto/task-field.dto';
import { PrismaService } from 'src/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class TaskFieldsService {
  constructor(private prisma: PrismaService, private projectService: ProjectsService) { }

  async findOne(id?: string) {
    const taskField = await this.prisma.taskFields.findUnique({ where: { id } });
    return taskField
  }

  async create(dto: TaskFieldDto) {
    try {
      const { userId, projectId, name, field } = dto

      const project = await this.projectService.findOneProject(userId, dto.projectId)
      if (!project) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      return await this.prisma.taskFields.create({
        data: { name, projectId, field },
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания поля проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }


  async findAll(dto: ProjectId) {
    try {
      const { userId, projectId } = dto
      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const taskFields = await this.prisma.taskFields.findMany({
        where: { projectId: projectId },
        select: {
          id: true, name: true, field: true,
          taskFieldsEnumValue: true
        }
      })
      return taskFields
    } catch (error) {
      throw new HttpException(`Произошла ошибка получения полей проекта!`, HttpStatus.FORBIDDEN)
    }
  }

  async update(dto: UpdateTaskFieldDto) {
    try {
      const { userId, projectId, id, name } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const taskField = await this.findOne(id)
      if (!taskField) throw new HttpException(`Произошла ошибка получения задачи!`, HttpStatus.BAD_REQUEST)

      return await this.prisma.taskFields.update({
        where: { id },
        data: { name },
      })
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления поля проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async remove(dto: TaskFieldId): Promise<{ message: string }> {
    try {
      const { userId, projectId, id } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const taskField = await this.findOne(id)
      if (!taskField) throw new HttpException(`Произошла ошибка получения задачи!`, HttpStatus.BAD_REQUEST)

      await this.prisma.taskFields.delete({ where: { id } });
      return { message: 'Поле проекта успешно удалено!' };
    } catch (error) {
      throw new HttpException(`Произошла ошибка удаления поля проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }
}
