import { Body, Controller, HttpStatus, Post, UsePipes, ValidationPipe } from "@nestjs/common"
import { ApiBadRequestResponse, ApiCreatedResponse, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger"
import { SessionResponseDto } from "./dto/session.response.dto"
import { SessionRequestDto } from "./dto/session.reques.dto"
import { SessionsService } from "./sessions.service"

@ApiTags("Sessions")
@Controller("sessions")
@UsePipes(new ValidationPipe({ transform: true }))
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
  ) {}

  @Post()
  @ApiResponse({
    type: SessionResponseDto,
    status: HttpStatus.OK,
    description: "Return the session payload",
  })
  @ApiCreatedResponse({
    description: 'Session created successfully',
    type: SessionResponseDto,
  })  
  async createSession(
    @Body() body: SessionRequestDto,
  ): Promise<SessionResponseDto> {
    const { email, password } = body

    return this.sessionsService.createSession({ email, password })
  }
}
