import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EnumValuesDto, TaskFieldValueDto } from './dto/task-field-value.dto';
import { PrismaService } from 'src/prisma.service';
import { TaskFieldsService } from 'src/task-fields/task-fields.service';
import { TasksService } from 'src/tasks/tasks.service';
import { ProjectsService } from 'src/projects/projects.service';

@Injectable()
export class TaskFieldValuesService {

  constructor(private prisma: PrismaService, private taskFieldsService: TaskFieldsService, private tasksService: TasksService, private projectService: ProjectsService) { }

  async create(dto: TaskFieldValueDto) {
    try {
      const { userId, projectId, taskFieldId, taskId, value } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const { field } = await this.taskFieldsService.findOne(taskFieldId)
      if (field === 'integer' && typeof value === 'number') {
        return await this.prisma.taskIntValues.create({ data: { value, taskFieldId, taskId }, });
      }
      if (field === 'string' && typeof value === 'string') {
        return await this.prisma.taskStrValues.create({ data: { value, taskFieldId, taskId }, });
      }
      if (field === 'enum' && typeof value === 'string') {
        const { name } = await this.prisma.taskFieldsEnumValue.findUnique({ where: { id: value } })
        return await this.prisma.taskEnumValues.create({ data: { value: name, taskFieldId, taskId }, });
      }
      return { message: `Проверьте правильность отправляемых данных!` }
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания значения поля задачи! ${error}`, HttpStatus.BAD_REQUEST)
    }
  }


  async update(dto: TaskFieldValueDto) {
    try {
      const { userId, projectId, taskFieldId, taskId, value } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const existTaskField = await this.taskFieldsService.findOne(taskFieldId)
      const existTask = await this.tasksService.findOneById(taskId)
      if (!existTaskField || !existTask) throw new HttpException(`Произошла ошибка создания значения поля задачи! Поле задачи или задача отсутствуют!`, HttpStatus.BAD_REQUEST)


      if (existTaskField.field === 'integer' && typeof value === 'number') {
        return await this.prisma.taskIntValues.update({
          where: { task_int_value_id: { taskFieldId: existTaskField.id, taskId: existTask.id } },
          data: { value, taskFieldId, taskId },
        });
      }

      if (existTaskField.field === 'string' && typeof value === 'string') {
        return await this.prisma.taskStrValues.update({
          where: { task_str_value_id: { taskFieldId: existTaskField.id, taskId: existTask.id } },
          data: { value, taskFieldId, taskId },
        });
      }

      if (existTaskField.field === 'enum' && typeof value === 'string') {
        const { name } = await this.prisma.taskFieldsEnumValue.findUnique({ where: { id: value } })
        return await this.prisma.taskEnumValues.update({
          where: { task_enum_value_id: { taskFieldId: existTaskField.id, taskId: existTask.id } },
          data: { value: name, taskFieldId, taskId },
        });
      }

      return { message: `Проверьте правильность отправляемых данных!` }
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания значения поля задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async createEnumValueList(dto: EnumValuesDto) {
    try {

      const { userId, projectId, taskFieldId, values } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const valuesEnum = values.split(',')
      return await this.prisma.$transaction(
        valuesEnum.map((item) => this.prisma.taskFieldsEnumValue.create({ data: { name: item, taskFieldId } }))
      )
    } catch (error) {
      throw new HttpException(`Произошла ошибка создания значения для списка поля задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }

  async remove(dto: TaskFieldValueDto) {
    try {
      const { value, taskFieldId, taskId, userId, projectId } = dto

      const existProject = await this.projectService.findOneProject(userId, projectId)
      if (!existProject) throw new HttpException(`Произошла ошибка! Такой проект не существует!`, HttpStatus.BAD_REQUEST)

      const existTaskField = await this.taskFieldsService.findOne(dto.taskFieldId)
      if (!existTaskField) throw new HttpException(`Произошла ошибка получения поля задачи!`, HttpStatus.BAD_REQUEST)

      const task = await this.tasksService.findOneById(taskId);
      if (!task) throw new HttpException(`Произошла ошибка полуения задачи! Задача не найдена!`, HttpStatus.BAD_REQUEST);

      if (existTaskField.field === 'integer' && typeof value === 'number') {
        await this.prisma.taskIntValues.delete({ where: { task_int_value_id: { taskFieldId, taskId } } });
      }
      if (existTaskField.field === 'string' && typeof value === 'string') {
        await this.prisma.taskStrValues.delete({ where: { task_str_value_id: { taskFieldId, taskId } } });
      }
      if (existTaskField.field === 'enum' && typeof value === 'string') {
        await this.prisma.taskEnumValues.delete({ where: { task_enum_value_id: { taskFieldId, taskId } } })
      }
      return { message: 'Значение поля задачи успешно удалено!' };
    } catch (error) {
      throw new HttpException(`Произошла ошибка удаления задачи! ${error}`, HttpStatus.FORBIDDEN)
    }
  }
}