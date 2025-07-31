import { PrismaService } from "@/infra/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { OpenRoutesInterface } from "./open-routes.repository.interface"
import { Tokens } from "@prisma/client"
//import { Users } from "@prisma/client"

@Injectable()
export class OpenRoutesRepository implements OpenRoutesInterface {
  constructor(private readonly prisma: PrismaService) {}

  async saveTokenInDatabase(userId: string, token: string): Promise<void> {
    await this.prisma.tokens.create({
      data: {
        user_id: userId,
        token,
      },
    })
  }

  async findTokenInDatabase(token: string): Promise<Tokens | null> {
    return this.prisma.tokens.findFirst({
      where: {
        token,
      },
    })
  }

  async deleteTokenAndUpdateUserPassword(
    userId: string,
    password: string,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.users.update({
        where: {
          id: userId,
        },
        data: {
          password,
        },
      })

      await tx.tokens.deleteMany({
        where: {
          user_id: userId,
        },
      })
    })
  }
}
