import { Module } from "@nestjs/common"
import { OpenRoutesController } from "./open-routes.controller"
import { ForgotPasswordService } from "./services/forgot-password.service"
import { OpenRoutesInterface } from "./repositories/open-routes.repository.interface"
import { OpenRoutesRepository } from "./repositories/open-routes.repository"

@Module({
  controllers: [OpenRoutesController],
  providers: [
    ForgotPasswordService,
    {
      provide: OpenRoutesInterface,
      useClass: OpenRoutesRepository,
    },
  ],
})
export class OpenRoutesModule {}
