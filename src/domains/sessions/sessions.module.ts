import { Module } from "@nestjs/common"
import { SessionsController } from "./sessions.controller"
import { SessionsService } from "./sessions.service"
import { SessionsRepository } from "./repositories/sessions.repository"
import { PrismaService } from "@/infra/prisma/prisma.service"
import { SessionsRepositoryInterface } from "./repositories/sessions.repository.interface"

@Module({
  controllers: [SessionsController],
  providers: [
    SessionsService,
    {
      provide: SessionsRepositoryInterface,
      useClass: SessionsRepository,
    },
    PrismaService,
  ],
})
export class SessionsModule {}
