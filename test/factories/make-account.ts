import { faker } from "@faker-js/faker"

import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository"
import { randomUUID } from "node:crypto"

export async function makeAccount() {
  const account = {
    id: randomUUID(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    whatsapp: faker.phone.number(),
    id_profile: randomUUID(),
    avatar: faker.image.url(),
    status: true,
  }

  const inMemoryAccountsRepository = new InMemoryAccountsRepository()

  await inMemoryAccountsRepository.create(account)

  return account
}
