import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common"
import { ApiResponse, ApiTags } from "@nestjs/swagger"
import { CreateAccountRequestDto } from "./dto/account-create.request.dto"
import { CreateAccountResponseDto } from "./dto/account-create.response.dto"
import { CreateAccountsService } from "./services/create-accounts.service"

@ApiTags("Accounts")
@Controller("accounts")
@UsePipes(new ValidationPipe({ transform: true }))
export class AccountsController {
  constructor(private readonly accountsService: CreateAccountsService) {}

  @Post()
  @ApiResponse({
    type: CreateAccountResponseDto,
    status: HttpStatus.CREATED,
    description: "Return the account payload",
  })
  async createAccount(
    @Body() body: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    return this.accountsService.createAccount(body)
  }
}
