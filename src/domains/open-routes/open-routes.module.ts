import { Module } from "@nestjs/common"
import { OpenRoutesController } from "./open-routes.controller"
import { ForgotPasswordService } from "./services/forgot-password.service"
import { OpenRoutesInterface } from "./repositories/open-routes.repository.interface"
import { OpenRoutesRepository } from "./repositories/open-routes.repository"
import { AccountsRepositoryInterface } from "../accounts/repositories/accounts.repository.interface"
import { AccountsRepository } from "../accounts/repositories/accounts.repository"
import { ResetPasswordService } from "./services/reset-password.service"

@Module({
  controllers: [OpenRoutesController],
  providers: [
    ForgotPasswordService,
    ResetPasswordService,
    {
      provide: OpenRoutesInterface,
      useClass: OpenRoutesRepository,
    },
    {
      provide: AccountsRepositoryInterface,
      useClass: AccountsRepository,
    },
  ],
})
export class OpenRoutesModule {}
