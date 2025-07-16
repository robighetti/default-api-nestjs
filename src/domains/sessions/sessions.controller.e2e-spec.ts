import { AppModule } from "@/infra/app.module"
import { PrismaService } from "@/infra/prisma/prisma.service"

import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { hash } from "bcryptjs"
import request from "supertest"

describe("Authenticate (E2E)", () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test("[POST] /sessions", async () => {
    await prisma.profiles.create({
      data: {
        id: "USER",
        description: "User",
        permissions: ["USER"],
      },
    })

    await prisma.users.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
        password: await hash("123456", 8),
        whatsapp: "1234567890",
        id_profile: "USER",
      },
    })

    const response = await request(app.getHttpServer()).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
      user: expect.objectContaining({
        name: "John Doe",
        email: "johndoe@example.com",
        whatsapp: "1234567890",
        avatar: "",
        id_profile: "USER",
      }),
    })
  })
})
