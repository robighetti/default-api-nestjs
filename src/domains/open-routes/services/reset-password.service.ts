import { BadRequestException, Injectable } from "@nestjs/common"
import {
  ResetPasswordParamsDto,
  ResetPasswordRequestDto,
} from "../dto/reset-password.request.dto"
import { ResetPasswordResponseDto } from "../dto/reset-password.response.dto"
import { OpenRoutesInterface } from "../repositories/open-routes.repository.interface"

@Injectable()
export class ResetPasswordService {
  constructor(private readonly openRoutesRepository: OpenRoutesInterface) {}

  async resetPassword(
    body: ResetPasswordRequestDto,
    params: ResetPasswordParamsDto,
  ): Promise<ResetPasswordResponseDto> {
    console.log(body, params)

    const userToken = await this.openRoutesRepository.findTokenInDatabase(
      params.token,
    )
    if (!userToken) {
      throw new BadRequestException("Token not found")
    }

    await this.openRoutesRepository.deleteTokenAndUpdateUserPassword(
      userToken.user_id,
      body.password,
    )

    return { message: "Password reset successfully" }
  }
}
