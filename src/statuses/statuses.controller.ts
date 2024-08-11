import { Controller, UsePipes, HttpCode, HttpStatus, ValidationPipe } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { ProjectId, SandOneStatusDto, StatusDto, UpdateOrderDto, UpdateStatusDto } from './dto/status.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SandOneProjectDto } from 'src/projects/dto/create-project.dto';

@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ cmd: "create-status" })
  create(@Payload() dto: StatusDto) {
    return this.statusesService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-all-status" })
  findAll(@Payload() dto: ProjectId) {
    return this.statusesService.findAll(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-one-status" })
  findOne(@Payload() dto: SandOneStatusDto) {
    return this.statusesService.findOne(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "update-status-order-project" })
  updateOrderStatuses(@Payload() dto: UpdateOrderDto) {
    return this.statusesService.updateOrderStatuses(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "update-status" })
  update(@Payload() dto: UpdateStatusDto) {
    return this.statusesService.update(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "delete-status" })
  remove(@Payload() dto: SandOneProjectDto) {
    return this.statusesService.remove(dto);
  }
}
