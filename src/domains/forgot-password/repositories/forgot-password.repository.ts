import { PrismaService } from "@/infra/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { ForgotPasswordInterface } from "./forgot-password.repository.interface"
import { Users } from "@prisma/client"

@Injectable()
export class ForgotPasswordRepository implements ForgotPasswordInterface {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    })
  }
}
