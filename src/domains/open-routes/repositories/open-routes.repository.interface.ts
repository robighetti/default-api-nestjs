import { Injectable } from "@nestjs/common"
import { Users } from "@prisma/client"

@Injectable()
export abstract class OpenRoutesInterface {
  abstract findByEmail(email: string): Promise<Users | null>
  abstract saveTokenInDatabase(userId: string, token: string): Promise<void>
}
