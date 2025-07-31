import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { ForgotPasswordService } from "./services/forgot-password.service"
import { ForgotPasswordResponseDto } from "./dto/forgot-password.response.dto"
import { ForgotPasswordRequestDto } from "./dto/forgot-password.request.dto"

@ApiTags("Open Routes")
@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class OpenRoutesController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

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
}
