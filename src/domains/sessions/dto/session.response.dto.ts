import { ApiProperty } from "@nestjs/swagger"

export class UserLoggedProps {
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
    nullable: true,
  })
  whatsapp: string

  @ApiProperty({
    description: "The avatar url of the user",
    example: "https://example.com/avatar.png",
    type: "string",
    nullable: true,
  })
  avatar?: string

  @ApiProperty({
    description: "The id profile of the user",
    example: "1234567890",
    type: "string",
    nullable: true,
  })
  id_profile: string
}

export class SessionResponseDto {
  @ApiProperty({
    description: "The user logged",
    example: "UserLoggedProps",
    type: [UserLoggedProps],
    nullable: false,
  })
  user: UserLoggedProps

  @ApiProperty({
    description: "The access token",
    example: "1234567890",
    type: "string",
    nullable: false,
  })
  access_token: string
}
