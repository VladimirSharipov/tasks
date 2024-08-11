import { IsNotEmpty, IsOptional, IsString, Validate } from "class-validator"
import { IsNumberOrString } from "src/config/validation"

export class ProjectId {
    @IsNotEmpty()
    @IsString()
    readonly userId: string

    @IsNotEmpty()
    @IsString()
    readonly projectId?: string
}

export class TaskFieldValueDto extends ProjectId {
    @IsOptional()
    @Validate(IsNumberOrString)
    readonly value: number | string

    @IsNotEmpty()
    @IsString()
    readonly taskFieldId: string

    @IsNotEmpty()
    @IsString()
    readonly taskId: string
}


export class EnumValuesDto extends ProjectId {
    @IsNotEmpty()
    @IsString()
    readonly values: string

    @IsNotEmpty()
    @IsString()
    readonly taskFieldId: string
}