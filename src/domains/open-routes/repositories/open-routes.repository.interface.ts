import { Injectable } from "@nestjs/common"
import { Tokens } from "@prisma/client"
//import { Users } from "@prisma/client"

@Injectable()
export abstract class OpenRoutesInterface {
  abstract saveTokenInDatabase(userId: string, token: string): Promise<void>
  abstract findTokenInDatabase(token: string): Promise<Tokens | null>
  abstract deleteTokenAndUpdateUserPassword(
    userId: string,
    password: string,
  ): Promise<void>
}
