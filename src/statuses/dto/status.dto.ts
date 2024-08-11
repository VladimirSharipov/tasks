import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator"
import { STATUS_RULE_LENGTH } from "src/config/util"

export class UserId {
    @IsOptional()
    @IsString()
    readonly userId: string
}

export class ProjectId extends UserId {
    @IsNotEmpty()
    @IsString()
    readonly projectId?: string
}

export class SandOneStatusDto extends ProjectId {
    @IsOptional()
    @IsString()
    readonly id?: string
}

export class StatusDto extends ProjectId {
    @IsNotEmpty()
    @Length(4, 150, { message: STATUS_RULE_LENGTH })
    @IsString()
    readonly name: string

    @IsOptional()
    @IsNumber()
    readonly order?: number
}

export class UpdateStatusDto extends StatusDto {
    @IsNotEmpty()
    @IsString()
    readonly id: string
}

export class UpdateOrderDto extends ProjectId {
    @IsOptional()
    @IsArray()
    readonly ids?: [string]
}