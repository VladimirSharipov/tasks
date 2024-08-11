import { Controller, HttpCode, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto, SandOneProjectDto, UpdateProjectDto } from './dto/create-project.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ cmd: "create-project" })
  create(@Payload() dto: ProjectDto) {
    return this.projectsService.create(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-all-projects" })
  findAll(@Payload() id: string) {
    return this.projectsService.findAll(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "get-one-project" })
  findOne(@Payload() dto: SandOneProjectDto) {
    return this.projectsService.findOne(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "update-projects" })
  update(@Payload() dto: UpdateProjectDto) {
    return this.projectsService.update(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @MessagePattern({ cmd: "delete-projects" })
  remove(@Payload() dto: SandOneProjectDto) {
    return this.projectsService.remove(dto);
  }
}
