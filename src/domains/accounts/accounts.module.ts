import { Module } from "@nestjs/common"
import { AccountsController } from "./accounts.controller"
import { CreateAccountsService } from "./services/create-accounts.service"
import { PrismaService } from "@/infra/prisma/prisma.service"
import { AccountsRepositoryInterface } from "./repositories/accounts.repository.interface"
import { AccountsRepository } from "./repositories/accounts.repository"

@Module({
  controllers: [AccountsController],
  providers: [
    CreateAccountsService,
    PrismaService,
    {
      provide: AccountsRepositoryInterface,
      useClass: AccountsRepository,
    },
  ],
})
export class AccountsModule {}
