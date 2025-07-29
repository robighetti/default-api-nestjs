import { Module } from "@nestjs/common"
import { ForgotPasswordController } from "./forgot-password.controller"
import { ForgotPasswordService } from "./services/forgot-password.service"
import { ForgotPasswordInterface } from "./repositories/forgot-password.repository.interface"
import { ForgotPasswordRepository } from "./repositories/forgot-password.repository"

@Module({
  controllers: [ForgotPasswordController],
  providers: [
    ForgotPasswordService,
    {
      provide: ForgotPasswordInterface,
      useClass: ForgotPasswordRepository,
    },
  ],
})
export class ForgotPasswordModule {}
