import { ApiProperty } from "@nestjs/swagger"

export class ResetPasswordResponseDto {
  @ApiProperty({
    description: "The message of the user",
    example: "Password reset successfully",
    type: "string",
    nullable: false,
  })
  message: string
}
