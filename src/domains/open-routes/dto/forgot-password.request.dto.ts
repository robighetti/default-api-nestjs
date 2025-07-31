import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEmail, IsString } from "class-validator"

export class ForgotPasswordRequestDto {
  @ApiProperty({
    description: "The email of the user",
    example: "john.doe@example.com",
    required: true,
  })
  @Type(() => String)
  @IsEmail({}, { message: "Email must be a valid email" })
  @IsString({ message: "Email must be a string" })
  email: string
}
