import { Body, Controller, HttpStatus, Post } from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { SessionResponseDto } from "./dto/session.response.dto"
import { SessionRequestDto } from "./dto/session.reques.dto"
import { SessionsService } from "./sessions.service"
import { JwtService } from "@nestjs/jwt"

@ApiTags("Sessions")
@Controller("sessions")
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  @ApiResponse({
    type: SessionResponseDto,
    status: HttpStatus.OK,
    description: "Return the session payload",
  })
  async createSession(
    @Body() body: SessionRequestDto,
  ): Promise<SessionResponseDto> {
    const { email, password } = body

    return this.sessionsService.createSession({ email, password })
  }
}
