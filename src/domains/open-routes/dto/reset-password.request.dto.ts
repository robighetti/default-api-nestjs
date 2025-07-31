import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsString, IsUUID, Length } from "class-validator"

export class ResetPasswordRequestDto {
  @ApiProperty({
    description: "The new password of the user",
    example: "123456",
    required: true,
  })
  @Type(() => String)
  @IsString({ message: "Password must be a string" })
  @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
  password: string
}

export class ResetPasswordParamsDto {
  @ApiProperty({
    description: "The reset token from URL",
    example: "550e8400-e29b-41d4-a716-446655440000",
    required: true,
  })
  @Type(() => String)
  @IsString({ message: "Token must be a string" })
  @IsUUID(4, { message: "Token must be a valid UUID" })
  token: string
}
