import { Injectable } from "@nestjs/common"
import { CreateAccountRequestDto } from "./dto/account-create.request.dto"
import { CreateAccountResponseDto } from "./dto/account-create.response.dto"

@Injectable()
export class AccountsService {
  async createAccount(
    data: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    return data
  }
}
