import { Injectable } from "@nestjs/common"
import { Users } from "@prisma/client"

export type UsersProps = {
  name: string
  email: string
  whatsapp: string
  password: string
  id_profile: string
}

@Injectable()
export abstract class AccountsRepositoryInterface {
  abstract create(data: UsersProps): Promise<Omit<Users, "password">>

  abstract findByEmail(email: string): Promise<Users | null>
}
