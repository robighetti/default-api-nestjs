import { randomUUID } from "node:crypto"
import { BadRequestException, Injectable } from "@nestjs/common"
import { CreateAccountRequestDto } from "../dto/account-create.request.dto"
import { CreateAccountResponseDto } from "../dto/account-create.response.dto"
import { AccountsRepositoryInterface } from "../repositories/accounts.repository.interface"

import { createHash } from "@/core/helpers/cryptography/encrypter"

@Injectable()
export class CreateAccountsService {
  constructor(private accountsRepository: AccountsRepositoryInterface) {}

  async createAccount(
    data: CreateAccountRequestDto,
  ): Promise<CreateAccountResponseDto> {
    const accountVerification = await this.accountsRepository.findByEmail(
      data.email,
    )

    if (accountVerification) {
      throw new BadRequestException("Account already exists")
    }

    const passwordHash = await createHash(randomUUID())

    const userCreated = await this.accountsRepository.create({
      ...data,
      password: passwordHash,
    })

    return {
      id: userCreated?.id,
      name: userCreated?.name,
      email: userCreated?.email,
      whatsapp: userCreated?.whatsapp,
      id_profile: userCreated?.id_profile,
    }
  }
}
