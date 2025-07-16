import { PrismaService } from "@/infra/prisma/prisma.service"
import { Injectable } from "@nestjs/common"
import { Users } from "@prisma/client"
import {
  AccountsRepositoryInterface,
  UsersProps,
} from "./accounts.repository.interface"

@Injectable()
export class AccountsRepository implements AccountsRepositoryInterface {
  constructor(private prisma: PrismaService) {}

  async create(data: UsersProps): Promise<Omit<Users, "password">> {
    return this.prisma.users.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        password: data.password,
        id_profile: data.id_profile,
      },
    })
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    })
  }
}
