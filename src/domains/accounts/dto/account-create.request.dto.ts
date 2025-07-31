import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsEmail, IsOptional, IsString } from "class-validator"

export class CreateAccountRequestDto {
  @ApiProperty({
    description: "The name of the user",
    example: "John Doe",
    required: true,
  })
  @Type(() => String)
  @IsString({ message: "Name must be a string" })
  name: string

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
    description: "The whatsapp of the user",
    example: "5511999999999",
    required: true,
  })
  @Type(() => String)
  @IsOptional()
  @IsString({ message: "Whatsapp must be a string" })
  whatsapp: string

  @ApiProperty({
    description: "The profile id of the user",
    example: "1",
    required: false,
  })
  @Type(() => String)
  @IsString({ message: "profile id must be a string" })
  id_profile: string
}
