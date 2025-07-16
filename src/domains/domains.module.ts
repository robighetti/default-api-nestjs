import { Module } from "@nestjs/common"
import { SessionsModule } from "./sessions/sessions.module"
import { AccountsModule } from "./accounts/accounts.module"

@Module({
  imports: [SessionsModule, AccountsModule],
})
export class DomainsModule {}
