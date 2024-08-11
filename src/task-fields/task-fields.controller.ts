import { Controller, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskFieldsService } from './task-fields.service';
import { ProjectId, TaskFieldDto, TaskFieldId, UpdateTaskFieldDto } from './dto/task-field.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('task-fields')
export class TaskFieldsController {
  constructor(private readonly taskFieldsService: TaskFieldsService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ cmd: "create-task-field" })
  create(@Payload() dto: TaskFieldDto) {
    return this.taskFieldsService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-all-task-field" })
  findAll(@Payload() projectId: ProjectId) {
    return this.taskFieldsService.findAll(projectId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "update-task-field" })
  update(@Payload() dto: UpdateTaskFieldDto) {
    return this.taskFieldsService.update(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "delete-task-field" })
  remove(@Payload() dto: TaskFieldId) {
    return this.taskFieldsService.remove(dto);
  }
}
