import { describe, it, beforeEach, expect, vi } from "vitest"
import { ResetPasswordService } from "./reset-password.service"
import { InMemoryTokensRepository } from "@test/repositories/in-memory-tokens.repository"
import { InMemoryAccountsRepository } from "@test/repositories/in-memory-accounts.repository"
import { BadRequestException } from "@nestjs/common"

describe("ResetPasswordService", () => {
  let sut: ResetPasswordService
  let inMemoryTokensRepository: InMemoryTokensRepository
  let inMemoryAccountsRepository: InMemoryAccountsRepository

  beforeEach(() => {
    inMemoryAccountsRepository = new InMemoryAccountsRepository()
    inMemoryTokensRepository = new InMemoryTokensRepository(
      inMemoryAccountsRepository,
    )
    sut = new ResetPasswordService(inMemoryTokensRepository)
  })

  it("should throw BadRequestException if token not found", async () => {
    const resetData = {
      password: "newPassword123",
    }
    const params = {
      token: "invalid-token",
    }

    await expect(sut.resetPassword(resetData, params)).rejects.toThrow(
      BadRequestException,
    )
  })

  it("should reset password successfully when token is valid", async () => {
    const token = "valid-token-123"
    const userId = "user-id-123"
    const newPassword = "newPassword123"

    inMemoryAccountsRepository.accounts = [
      {
        id: userId,
        name: "Test User",
        email: "test@example.com",
        password: "old-password",
        whatsapp: null,
        avatar: null,
        id_profile: "profile-id",
        status: true,
      },
    ]

    inMemoryTokensRepository.tokens = [
      {
        id: "token-id",
        user_id: userId,
        token,
        createdAt: new Date(),
      },
    ]

    const resetData = {
      password: newPassword,
    }
    const params = {
      token,
    }

    const result = await sut.resetPassword(resetData, params)

    expect(result).toEqual({ message: "Password reset successfully" })
  })

  it("should call repository methods with correct parameters", async () => {
    const token = "valid-token-456"
    const userId = "user-id-456"
    const newPassword = "newPassword456"

    inMemoryAccountsRepository.accounts = [
      {
        id: userId,
        name: "Test User",
        email: "test@example.com",
        password: "old-password",
        whatsapp: null,
        avatar: null,
        id_profile: "profile-id",
        status: true,
      },
    ]

    const findTokenSpy = vi.spyOn(
      inMemoryTokensRepository,
      "findTokenInDatabase",
    )
    const deleteTokenSpy = vi.spyOn(
      inMemoryTokensRepository,
      "deleteTokenAndUpdateUserPassword",
    )

    inMemoryTokensRepository.tokens = [
      {
        id: "token-id-2",
        user_id: userId,
        token,
        createdAt: new Date(),
      },
    ]

    const resetData = {
      password: newPassword,
    }
    const params = {
      token,
    }

    await sut.resetPassword(resetData, params)

    expect(findTokenSpy).toHaveBeenCalledWith(token)
    expect(deleteTokenSpy).toHaveBeenCalledWith(userId, newPassword)
  })

  it("should handle multiple tokens and find the correct one", async () => {
    const token1 = "token-1"
    const token2 = "token-2"
    const userId1 = "user-1"
    const userId2 = "user-2"

    inMemoryAccountsRepository.accounts = [
      {
        id: userId1,
        name: "User 1",
        email: "user1@example.com",
        password: "old-password-1",
        whatsapp: null,
        avatar: null,
        id_profile: "profile-id-1",
        status: true,
      },
      {
        id: userId2,
        name: "User 2",
        email: "user2@example.com",
        password: "old-password-2",
        whatsapp: null,
        avatar: null,
        id_profile: "profile-id-2",
        status: true,
      },
    ]

    inMemoryTokensRepository.tokens = [
      {
        id: "token-id-1",
        user_id: userId1,
        token: token1,
        createdAt: new Date(),
      },
      {
        id: "token-id-2",
        user_id: userId2,
        token: token2,
        createdAt: new Date(),
      },
    ]

    const resetData = {
      password: "newPassword789",
    }
    const params = {
      token: token2,
    }

    const result = await sut.resetPassword(resetData, params)

    expect(result).toEqual({ message: "Password reset successfully" })
  })

  it("should throw BadRequestException for expired or invalid token format", async () => {
    const resetData = {
      password: "newPassword123",
    }
    const params = {
      token: "invalid-uuid-format",
    }

    await expect(sut.resetPassword(resetData, params)).rejects.toThrow(
      BadRequestException,
    )
  })
})
