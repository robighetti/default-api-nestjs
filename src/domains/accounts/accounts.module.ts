import { Module } from "@nestjs/common"
import { AccountsController } from "./accounts.controller"
import { AccountsService } from "./accounts.service"
import { PrismaService } from "@/infra/prisma/prisma.service"

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, PrismaService],
})
export class AccountsModule {}
