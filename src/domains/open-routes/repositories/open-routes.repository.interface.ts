import { Injectable } from "@nestjs/common"
//import { Users } from "@prisma/client"

@Injectable()
export abstract class OpenRoutesInterface {
  abstract saveTokenInDatabase(userId: string, token: string): Promise<void>
}
