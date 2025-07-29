import { Module } from "@nestjs/common"
import { SessionsModule } from "./sessions/sessions.module"
import { AccountsModule } from "./accounts/accounts.module"
import { ForgotPasswordModule } from "./forgot-password/forgot-password.module"

import { PrismaModule } from "@/infra/prisma/prisma.module"
import { EmailsModule } from "@/infra/emails/emails.module"

@Module({
  imports: [
    PrismaModule,
    SessionsModule,
    AccountsModule,
    ForgotPasswordModule,
    EmailsModule,
  ],
})
export class DomainsModule {}
