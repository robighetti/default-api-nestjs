import {
  AccountsRepositoryInterface,
  UsersProps,
} from "@/domains/accounts/repositories/accounts.repository.interface"
import { Users } from "@prisma/client"
import { randomUUID } from "node:crypto"

export class InMemoryAccountsRepository implements AccountsRepositoryInterface {
  public accounts: Users[] = []

  constructor() {
    this.accounts = []
  }

  async create(data: UsersProps): Promise<Omit<Users, "password">> {
    const account: Users = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      whatsapp: data.whatsapp,
      password: data.password,
      avatar: null,
      status: true,
      id_profile: data.id_profile,
    }

    this.accounts.push(account)

    return {
      id: account.id,
      name: account.name,
      email: account.email,
      whatsapp: account.whatsapp,
      avatar: account.avatar,
      status: account.status,
      id_profile: account.id_profile,
    }
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.accounts.find((account) => account.email === email) || null
  }
}
