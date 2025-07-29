import { Module } from "@nestjs/common"
import { AccountsController } from "./accounts.controller"
import { CreateAccountsService } from "./services/create-accounts.service"

import { AccountsRepositoryInterface } from "./repositories/accounts.repository.interface"
import { AccountsRepository } from "./repositories/accounts.repository"

@Module({
  controllers: [AccountsController],
  providers: [
    CreateAccountsService,
    {
      provide: AccountsRepositoryInterface,
      useClass: AccountsRepository,
    },
  ],
})
export class AccountsModule {}
