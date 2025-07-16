import { ApiProperty } from "@nestjs/swagger"

export class CreateAccountResponseDto {
  @ApiProperty({
    description: "The id of the user",
    example: "1234567890",
    type: "string",
    nullable: false,
  })
  id: string

  @ApiProperty({
    description: "The name of the user",
    example: "Luke Skywalker",
    type: "string",
    nullable: false,
  })
  name: string

  @ApiProperty({
    description: "The email of the user",
    example: "luke@skywalker.com",
    type: "string",
    nullable: false,
  })
  email: string

  @ApiProperty({
    description: "The whatsapp of the user",
    example: "5511999999999",
    type: "string",
    nullable: false,
  })
  whatsapp: string

  @ApiProperty({
    description: "The id_profile of the user",
    example: "1234567890",
    type: "string",
    nullable: false,
  })
  id_profile: string
}
