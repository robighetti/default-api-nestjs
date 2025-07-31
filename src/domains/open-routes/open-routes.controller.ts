import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { ForgotPasswordService } from "./services/forgot-password.service"
import { ForgotPasswordResponseDto } from "./dto/forgot-password.response.dto"
import { ForgotPasswordRequestDto } from "./dto/forgot-password.request.dto"
import { ResetPasswordResponseDto } from "./dto/reset-password.response.dto"
import {
  ResetPasswordParamsDto,
  ResetPasswordRequestDto,
} from "./dto/reset-password.request.dto"
import { ResetPasswordService } from "./services/reset-password.service"

@ApiTags("Open Routes")
@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class OpenRoutesController {
  constructor(
    private readonly forgotPasswordService: ForgotPasswordService,
    private readonly resetPasswordService: ResetPasswordService,
  ) {}

  @Post("forgot-password")
  @ApiResponse({
    type: ForgotPasswordResponseDto,
    status: HttpStatus.OK,
    description: "Return the forgot password payload",
  })
  async forgotPassword(
    @Body() body: ForgotPasswordRequestDto,
  ): Promise<ForgotPasswordResponseDto> {
    return this.forgotPasswordService.forgotPassword(body)
  }

  @Patch("reset-password/:token")
  @ApiResponse({
    type: ResetPasswordResponseDto,
    status: HttpStatus.OK,
    description: "Return the reset password payload",
  })
  async resetPassword(
    @Body() body: ResetPasswordRequestDto,
    @Param() params: ResetPasswordParamsDto,
  ): Promise<ResetPasswordResponseDto> {
    return this.resetPasswordService.resetPassword(body, params)
  }
}
