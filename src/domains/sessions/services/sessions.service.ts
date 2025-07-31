import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common"
import { SessionRequestDto } from "../dto/session.request.dto"
import { SessionResponseDto } from "../dto/session.response.dto"
import { SessionsRepositoryInterface } from "../repositories/sessions.repository.interface"
import { compare } from "bcryptjs"
import { JwtService } from "@nestjs/jwt"
import { SessionEntity } from "../entities/session.entity"

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionsRepository: SessionsRepositoryInterface,
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

    if (!user.password) {
      throw new BadRequestException("User credentials are invalid")
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("User credentials are invalid")
    }

    const acessToken = this.jwt.sign({ sub: user.id })

    return SessionEntity.fromEntity({
      user,
      access_token: acessToken,
    }).serialize()
  }
}
