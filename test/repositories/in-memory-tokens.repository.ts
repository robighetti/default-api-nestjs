import { Tokens } from "@prisma/client"
import { randomUUID } from "node:crypto"

import { OpenRoutesInterface } from "@domains/open-routes/repositories/open-routes.repository.interface"
import { InMemoryAccountsRepository } from "./in-memory-accounts.repository"

export class InMemoryTokensRepository implements OpenRoutesInterface {
  public tokens: Tokens[] = []
  private accountsRepository: InMemoryAccountsRepository

  constructor(accountsRepository?: InMemoryAccountsRepository) {
    this.tokens = []
    this.accountsRepository =
      accountsRepository || new InMemoryAccountsRepository()
  }

  async saveTokenInDatabase(userId: string, token: string): Promise<void> {
    this.tokens.push({
      id: randomUUID(),
      user_id: userId,
      token,
      createdAt: new Date(),
    })
  }

  async findTokenInDatabase(token: string): Promise<Tokens | null> {
    return this.tokens.find((tk) => tk.token === token) || null
  }

  async deleteTokenAndUpdateUserPassword(
    userId: string,
    password: string,
  ): Promise<void> {
    const userIndex = this.accountsRepository.accounts.findIndex(
      (user) => user.id === userId,
    )

    if (userIndex !== -1) {
      this.accountsRepository.accounts[userIndex].password = password
    }

    this.tokens = this.tokens.filter((tk) => tk.user_id !== userId)
  }
}
