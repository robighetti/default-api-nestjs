import { ApiProperty } from "@nestjs/swagger"

export class SessionRequestDto {
  @ApiProperty({
    description: "The email of the user",
    example: "john.doe@example.com",
    required: true,
  })
  email: string

  @ApiProperty({
    description: "The password of the user",
    example: "password",
  })
  password: string
}
