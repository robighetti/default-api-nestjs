import { BadRequestException, Injectable } from "@nestjs/common"
import { ForgotPasswordRequestDto } from "../dto/forgot-password.request.dto"
import { ForgotPasswordResponseDto } from "../dto/forgot-password.response.dto"
import { ForgotPasswordInterface } from "../repositories/forgot-password.repository.interface"
import { EmailsService } from "@/infra/emails/emails.service"
import { passwordRecovery } from "../utils/emails-template/passwordRecovery"
import { randomUUID } from "node:crypto"
import { Env } from "@/infra/env"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class ForgotPasswordService {
  constructor(
    private readonly forgotPasswordRepository: ForgotPasswordInterface,
    private readonly emailsService: EmailsService,
    private readonly config: ConfigService<Env, true>,
  ) {}

  async forgotPassword(
    body: ForgotPasswordRequestDto,
  ): Promise<ForgotPasswordResponseDto> {
    const { email } = body
    const user = await this.forgotPasswordRepository.findByEmail(email)
    if (!user) {
      throw new BadRequestException("Credential not found")
    }

    const token = randomUUID()

    const html = passwordRecovery(
      `${this.config.get("FRONTEND_URL")}/reset-password/${token}`,
    )

    await this.emailsService.sendMail({
      to: user.email,
      subject: "Password Recovery",
      template: html,
    })

    return {
      message: "Password reset successfully",
    }
  }
}
