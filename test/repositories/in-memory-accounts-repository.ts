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
    const account = { ...data, id: randomUUID(), avatar: null, status: true }

    this.accounts.push(account)
    return account
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.accounts.find((account) => account.email === email) || null
  }
}
