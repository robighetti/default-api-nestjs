import { Module } from "@nestjs/common"
import { SessionsController } from "./sessions.controller"
import { SessionsService } from "./services/sessions.service"
import { SessionsRepository } from "./repositories/sessions.repository"
import { SessionsRepositoryInterface } from "./repositories/sessions.repository.interface"

@Module({
  controllers: [SessionsController],
  providers: [
    SessionsService,
    {
      provide: SessionsRepositoryInterface,
      useClass: SessionsRepository,
    },
  ],
})
export class SessionsModule {}
