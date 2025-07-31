import { PrismaService } from "@/infra/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { OpenRoutesInterface } from "./open-routes.repository.interface"
import { Users } from "@prisma/client"

@Injectable()
export class OpenRoutesRepository implements OpenRoutesInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    })
  }

  async saveTokenInDatabase(userId: string, token: string): Promise<void> {
    await this.prisma.tokens.create({
      data: {
        user_id: userId,
        token,
      },
    })
  }
}
