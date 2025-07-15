import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { envSchema } from "./env"
import { AuthModule } from "./auth/auth.module"
import { DomainsModule } from "@/domains/domains.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    DomainsModule,
  ],
})
export class AppModule {}
