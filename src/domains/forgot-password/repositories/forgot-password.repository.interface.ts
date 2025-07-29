import { Injectable } from "@nestjs/common"
import { Users } from "@prisma/client"

@Injectable()
export abstract class ForgotPasswordInterface {
  abstract findByEmail(email: string): Promise<Users | null>
}
