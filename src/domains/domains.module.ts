import { Module } from "@nestjs/common"
import { SessionsModule } from "./sessions/sessions.module"
import { AccountsModule } from "./accounts/accounts.module"
import { OpenRoutesModule } from "./open-routes/open-routes.module"

import { PrismaModule } from "@/infra/prisma/prisma.module"
import { EmailsModule } from "@/infra/emails/emails.module"

@Module({
  imports: [
    PrismaModule,
    SessionsModule,
    AccountsModule,
    OpenRoutesModule,
    EmailsModule,
  ],
})
export class DomainsModule {}
