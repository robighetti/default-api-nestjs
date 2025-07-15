import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { SessionRequestDto } from "./dto/session.reques.dto"
import { SessionResponseDto } from "./dto/session.response.dto"
import { SessionsRepository } from "./repositories/sessions.repository"
import { compare } from "bcryptjs"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly jwt: JwtService,
  ) {}

  async createSession({
    email,
    password,
  }: SessionRequestDto): Promise<SessionResponseDto> {
    const user = await this.sessionsRepository.findByEmail(email)

    if (!user) {
      throw new BadRequestException("User credentials are invalid")
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("User credentials are invalid")
    }

    const acessToken = this.jwt.sign({ sub: user.id })

    return {
      access_token: acessToken,
      user: {
        name: user.name,
        email: user.email,
        whatsapp: user.whatsapp || "",
        avatar: user.avatar || "",
        id_profile: user.id_profile || "",
      },
    }
  }
}
