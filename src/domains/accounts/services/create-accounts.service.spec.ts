import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts-repository"
import { CreateAccountsService } from "./create-accounts.service"
import { makeAccount } from "@test/factories/make-account"

describe("Create Account Service", () => {
  let sut: CreateAccountsService
  let inMemoryAccountsRepository: InMemoryAccountsRepository

  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    sut = new CreateAccountsService(inMemoryAccountsRepository)
  })

  it("should be able to create a new account", async () => {
    const account = await makeAccount()

    const { id } = await sut.createAccount(account)

    expect(id).toBeDefined()
  })
})
