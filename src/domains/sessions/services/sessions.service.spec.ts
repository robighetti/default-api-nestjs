import { JwtService } from "@nestjs/jwt"
import { SessionsService } from "./sessions.service"
import { makeAccount } from "@test/factories/make-account"
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts.repository"

describe("SessionsService", () => {
  let sut: SessionsService
  let inMemoryAccountsRepository: InMemoryAccountsRepository

  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    const jwtService = new JwtService({
      secret: "test-secret-key",
    })
    sut = new SessionsService(inMemoryAccountsRepository, jwtService)
  })

  it("should be able to create a session", async () => {
    const password = "123456"
    const account = await makeAccount(password)

    await inMemoryAccountsRepository.create(account)

    const { access_token, user } = await sut.createSession({
      email: account.email,
      password: password,
    })

    expect(access_token).toBeDefined()
    expect(user).toBeDefined()
    expect(user.email).toBe(account.email)
    expect(user.name).toBe(account.name)
  })

  it("should throw BadRequestException when user does not exist", async () => {
    const sessionData = {
      email: "nonexistent@example.com",
      password: "123456",
    }

    await expect(sut.createSession(sessionData)).rejects.toThrow(
      "User credentials are invalid",
    )
  })

  it("should throw UnauthorizedException when password is incorrect", async () => {
    const password = "123456"
    const account = await makeAccount(password)

    await inMemoryAccountsRepository.create(account)

    const sessionData = {
      email: account.email,
      password: "wrongpassword",
    }

    await expect(sut.createSession(sessionData)).rejects.toThrow(
      "User credentials are invalid",
    )
  })
})
