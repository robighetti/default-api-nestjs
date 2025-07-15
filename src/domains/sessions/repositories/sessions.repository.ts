import { PrismaService } from "@/infra/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { SessionsRepositoryInterface } from "./sessions.repository.interface"

@Injectable()
export class SessionsRepository implements SessionsRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        whatsapp: true,
        avatar: true,
        password: true,
        id_profile: true,
        status: true,
      },
    })

    return user
  }
}
