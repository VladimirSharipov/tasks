import { Controller, Post, Body, Patch, HttpCode, UsePipes, HttpStatus, ValidationPipe } from '@nestjs/common';
import { TaskFieldValuesService } from './task-field-values.service';
import { EnumValuesDto, TaskFieldValueDto } from './dto/task-field-value.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('task-field-values')
export class TaskFieldValuesController {
  constructor(private readonly taskFieldValuesService: TaskFieldValuesService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "create-task-field-value" })
  create(@Payload() dto: TaskFieldValueDto) {
    return this.taskFieldValuesService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "create-enum-task-field-values-list" })
  createEnumValueList(@Payload() dto: EnumValuesDto) {
    return this.taskFieldValuesService.createEnumValueList(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "update-task-field-value" })
  update(@Payload() dto: TaskFieldValueDto) {
    return this.taskFieldValuesService.update(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "remove-task-field-value" })
  delete(@Payload() dto: TaskFieldValueDto) {
    return this.taskFieldValuesService.remove(dto);
  }

}
