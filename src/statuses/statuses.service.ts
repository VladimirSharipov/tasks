import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectId, SandOneStatusDto, StatusDto, UpdateOrderDto, UpdateStatusDto } from './dto/status.dto';
import { PrismaService } from 'src/prisma.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class StatusesService {
  constructor(private prisma: PrismaService, private projectService: ProjectsService) { }

  async findOneStatus(id?: string) {
    const status = await this.prisma.status.findUnique({ where: { id } });
    return status
  }

  async create(dto: StatusDto) {
    try {
      const { userId, projectId, name } = dto
      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const count = await this.prisma.status.count({ where: { projectId } })
      return await this.prisma.status.create({ data: { name, order: count, projectId }, select: { id: true, name: true, order: true } });

    } catch (error) {
      throw new HttpException(`Произошла ошибка создания статуса проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findAll(dto: ProjectId) {
    try {
      const { userId, projectId } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      return await this.prisma.status.findMany({ where: { projectId: projectId }, select: { id: true, name: true }, orderBy: { order: "asc" } })

    } catch (error) {
      throw new HttpException(`Произошла ошибка получения статусов проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findOne(dto: SandOneStatusDto) {
    try {
      const { userId, id, projectId } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.NOT_FOUND)

      return await this.prisma.status.findUnique({ where: { id }, select: { id: true, name: true } });

    } catch (error) {
      throw new HttpException(`Произошла ошибка получения статуса проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async update(dto: UpdateStatusDto) {
    try {
      const { id, userId, projectId, order, name } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const status = await this.findOneStatus(id)
      if (!status) throw new HttpException(`Статус проекта не найден!`, HttpStatus.BAD_REQUEST);

      return await this.prisma.status.update({
        where: { id }, data: { name, order, projectId },
        select: {
          id: true, name: true, order: true,
          tasks: { select: { id: true, createdAt: true, name: true, description: true, order: true } }
        }
      });
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления статуса проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async remove(dto: SandOneStatusDto) {
    try {
      const { userId, id, projectId } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const status = await this.findOneStatus(id)
      if (!status) throw new HttpException(`Статус проекта не найден!`, HttpStatus.BAD_REQUEST);

      await this.prisma.status.delete({ where: { id } });
      return { message: 'Статус проекта успешно удален!' };
    } catch (error) {
      throw new HttpException(`Произошла ошибка при попытке удаления статуса проекта!`, HttpStatus.FORBIDDEN);
    }
  }

  async updateOrderStatuses(dto: UpdateOrderDto) {
    try {
      return await this.prisma.$transaction(
        dto.ids.map((id, order) => this.prisma.status.update({
          where: { id },
          data: { order },
          select: { id: true, name: true },
        }))
      )
    } catch (error) {
      throw new HttpException(`Произошла ошибка обновления порядка статуса проекта!`, HttpStatus.FORBIDDEN);
    }
  }
}
