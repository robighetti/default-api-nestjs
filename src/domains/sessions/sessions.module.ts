import { Module } from "@nestjs/common"
import { SessionsController } from "./sessions.controller"
import { SessionsService } from "./sessions.service"
import { SessionsRepository } from "./repositories/sessions.repository"
import { PrismaService } from "@/infra/prisma/prisma.service"

@Module({
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRepository, PrismaService],
})
export class SessionsModule {}
