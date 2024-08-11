import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { IdTaskDto, StatusIdDto, TaskDto, UpdateOrderDto, UpdateTaskDto } from './dto/task.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "create-task" })
  create(@Payload() dto: TaskDto) {
    return this.tasksService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-all-tasks" })
  findAll(@Payload() dto: StatusIdDto) {
    return this.tasksService.findAll(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-one-task" })
  findOne(@Payload() dto: IdTaskDto) {
    return this.tasksService.findOne(dto);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "update-order-tasks" })
  updateOrderStatuses(@Payload() dto: UpdateOrderDto) {
    return this.tasksService.updateOrderTasks(dto);
  }


  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "update-task" })
  update(@Payload() dto: UpdateTaskDto) {
    return this.tasksService.update(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "delete-task" })
  remove(@Payload() dto: IdTaskDto) {
    return this.tasksService.remove(dto);
  }
}
