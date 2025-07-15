import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEmail, IsString, MinLength } from "class-validator"

export class SessionRequestDto {
  @ApiProperty({
    description: "The email of the user",
    example: "john.doe@example.com",
    required: true,
  })
  @Type(() => String)
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsString({ message: "Email must be a string" })
  email: string

  @ApiProperty({
    description: "The password of the user",
    example: "password",
    required: true,
  })
  @Type(() => String)
  @IsString({ message: "Password must be a string" })
  @MinLength(6, { message: "Password must be at least 8 characters long" })
  password: string
}
