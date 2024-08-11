import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProjectDto, SandOneProjectDto, UpdateProjectDto } from './dto/create-project.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) { }

  async findOneProject(userId?: string, id?: string) {
    return await this.prisma.project.findUnique({ where: { userId, id } });
  }

  async create(dto: ProjectDto) {
    try {
      return await this.prisma.project.create({
        data: { name: dto.name, description: dto.description, userId: dto.userId },
        select: { id: true, name: true, description: true, createdAt: true }
      });
    } catch (error) {
      throw new HttpException(` ошибка во время создания проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findAll(userId: string) {
    try {
      return await this.prisma.project.findMany({
        where: { userId: userId },
        select: {
          id: true, name: true, description: true, createdAt: true,
          taskFields: {
            select: {
              id: true, name: true, field: true,
              taskFieldsEnumValue: { select: { id: true, name: true } },
            }
          },
          statuses: {
            select: {
              id: true, name: true,
              tasks: {
                select: { id: true, createdAt: true, name: true, description: true },
                orderBy: { order: 'asc' }
              }
            },
            orderBy: { order: 'asc' }
          },
        }
      });
    } catch (error) {
      throw new HttpException(`ошибка при получении проектов! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async findOne(dto: SandOneProjectDto) {
    try {
      const { userId, id } = dto
      const project = await this.findOneProject(userId, id)
      if (!project) throw new HttpException(`Такой проект не существует!`, HttpStatus.BAD_REQUEST)
      return await this.prisma.project.findUnique({
        where: { userId, id }, select: {
          id: true, name: true, description: true, createdAt: true,
          taskFields: {
            select: {
              id: true, name: true, field: true,
            }
          },
          statuses: {
            select: {
              id: true, name: true,
              tasks: {
                select: { id: true, createdAt: true, name: true, description: true },
                orderBy: { order: 'asc' }
              }
            },
            orderBy: { order: 'asc' }
          },
        }
      })
    } catch (error) {
      throw new HttpException(` ошибка при получении проекта! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async update(dto: UpdateProjectDto) {
    try {
      const { userId, id, name, description } = dto
      const project = await this.findOneProject(userId, id)
      if (!project) throw new HttpException(`Такой проект не существует!`, HttpStatus.BAD_REQUEST)
      return await this.prisma.project.update({
        where: { id, userId }, data: { name, description, userId }, select: {
          id: true, name: true, description: true, createdAt: true,
          statuses: {
            select: {
              id: true, name: true, order: true,
              tasks: {
                select: { id: true, createdAt: true, name: true, description: true, order: true }
              }
            }
          },
          taskFields: {
            select: {
              id: true, name: true, field: true,
              taskFieldsEnumValue: { select: { id: true, name: true } },
              taskIntValues: { select: { value: true, taskFieldId: true, taskId: true } },
              taskStrValues: { select: { value: true, taskFieldId: true, taskId: true } }
            }
          }
        }
      })
    } catch (error) {
      throw new HttpException(`Что-то пошло не так при попытке обновления проекта!`, HttpStatus.FORBIDDEN);
    }
  }

  async remove(dto: SandOneProjectDto): Promise<{ message: string }> {
    try {
      const { userId, id } = dto
      const project = await this.findOneProject(userId, id)
      if (!project) throw new HttpException(`Такой проект не существует!`, HttpStatus.BAD_REQUEST)
      await this.prisma.project.delete({ where: { id, userId } });
      return { message: 'Проект успешно удален!' };
    } catch (error) {
      throw new HttpException(`Что-то пошло не так при попытке удаления проекта!`, HttpStatus.FORBIDDEN);
    }
  }
}
