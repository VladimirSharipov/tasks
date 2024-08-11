import { IsArray, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { TASK_RULE_LENGTH } from "src/config/util";


export class ProjectId {
    @IsNotEmpty()
    @IsString()
    readonly userId: string

    @IsNotEmpty()
    @IsString()
    readonly projectId?: string
}

export class StatusIdDto extends ProjectId {
    @IsNotEmpty()
    @IsString()
    readonly statusId: string
}

export class TaskDto extends StatusIdDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 150, { message: TASK_RULE_LENGTH })
    readonly name: string

    @IsOptional()
    @IsString()
    readonly description?: string
}

export class IdTaskDto extends StatusIdDto {
    @IsNotEmpty()
    @IsString()
    readonly id?: string
}

export class UpdateTaskDto extends TaskDto {
    @IsNotEmpty()
    @IsString()
    readonly id?: string
}

export class UpdateOrderDto extends StatusIdDto {
    @IsOptional()
    @IsArray()
    readonly ids?: [string]
}