import { TypeField } from "@prisma/client"
import { IsEnum, IsNotEmpty, IsString } from "class-validator"


export class ProjectId {

    @IsNotEmpty()
    @IsString()
    readonly userId: string

    @IsNotEmpty()
    @IsString()
    readonly projectId?: string
}

export class TaskFieldId extends ProjectId {
    @IsNotEmpty()
    @IsString()
    readonly id: string
}

export class UpdateTaskFieldDto extends TaskFieldId {

    @IsNotEmpty()
    @IsString()
    readonly name: string
}

export class TaskFieldDto extends ProjectId {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsEnum(TypeField)
    readonly field: TypeField
}
