import { OpenRoutesInterface } from "@domains/open-routes/repositories/open-routes.repository.interface"
import { Tokens } from "@prisma/client"

import { randomUUID } from "node:crypto"

export class InMemoryTokensRepository implements OpenRoutesInterface {
  public tokens: Tokens[] = []

  constructor() {
    this.tokens = []
  }

  async saveTokenInDatabase(userId: string, token: string): Promise<void> {
    this.tokens.push({
      id: randomUUID(),
      user_id: userId,
      token,
      createdAt: new Date(),
    })
  }
}
