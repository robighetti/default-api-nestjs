import { Module } from "@nestjs/common"
import { AccountsController } from "./accounts.controller"
import { AccountsService } from "./accounts.service"
import { PrismaService } from "@/infra/prisma/prisma.service"
import { AccountsRepository } from "./repositories/accounts.repository"

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService, AccountsRepository],
})
export class AccountsModule {}
