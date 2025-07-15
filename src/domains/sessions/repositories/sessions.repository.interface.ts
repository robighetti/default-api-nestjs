import { Injectable } from "@nestjs/common"

import { Users } from "@prisma/client"

@Injectable()
export abstract class SessionsRepositoryInterface {
  abstract findByEmail(email: string): Promise<Users | null>
}
