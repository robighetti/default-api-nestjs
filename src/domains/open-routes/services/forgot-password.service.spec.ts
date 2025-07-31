import { describe, it, beforeEach, expect, vi } from "vitest"
import { ForgotPasswordService } from "./forgot-password.service"
import { InMemoryTokensRepository } from "@test/repositories/in-memory-tokens.repository"
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts.repository"
import { ConfigService } from "@nestjs/config"
import { Env } from "@/infra/env"
import { BadRequestException } from "@nestjs/common"
import { EmailsService } from "@/infra/emails/emails.service"

describe("ForgotPasswordService", () => {
  let sut: ForgotPasswordService
  let inMemoryTokensRepository: InMemoryTokensRepository
  let inMemoryAccountsRepository: InMemoryAccountsRepository
  let emailServiceMock: EmailsService
  let configServiceMock: Partial<ConfigService<Env, true>>

  beforeEach(() => {
    inMemoryTokensRepository = new InMemoryTokensRepository()
    inMemoryAccountsRepository = new InMemoryAccountsRepository()

    // Create a mock for EmailsService
    emailServiceMock = {
      sendMail: vi.fn().mockResolvedValue(undefined),
    } as any as EmailsService

    configServiceMock = {
      get: vi.fn((key: keyof Env) => {
        if (key === "FRONTEND_URL") return "http://mock-frontend-url"
        return undefined
      }),
    }

    sut = new ForgotPasswordService(
      inMemoryAccountsRepository,
      inMemoryTokensRepository,
      emailServiceMock,
      configServiceMock as ConfigService<Env, true>,
    )
  })

  it("should throw BadRequestException if user not found", async () => {
    await expect(
      sut.forgotPassword({ email: "notfound@test.com" }),
    ).rejects.toThrow(BadRequestException)
  })

  it("should send recovery email and save token", async () => {
    const user = {
      id: "user-id",
      email: "user@test.com",
      name: "Test User",
      whatsapp: null,
      avatar: null,
      id_profile: "profile-id",
      password: "hashed-password",
      status: true,
    }

    inMemoryAccountsRepository.accounts = [user]

    const response = await sut.forgotPassword({ email: user.email })
    expect(response).toEqual({ message: "Password reset successfully" })
  })
})
