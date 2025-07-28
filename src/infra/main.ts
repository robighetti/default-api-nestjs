import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { Env } from "./env"
import { Logger, LogLevel } from "@nestjs/common"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import Documentation from "@/core/docs/documentation.entity"

async function bootstrap() {
  const logger = new Logger("Default-API")
  const app = await NestFactory.create(AppModule, {
    logger: [
      "log",
      "debug",
      "error",
      "warn",
      "verbose",
      ...(process.env.LOGGER_LEVEL?.split(",") || []).map(
        (level) => level as LogLevel,
      ),
    ],
  })

  const configService = app.get<ConfigService<Env, true>>(ConfigService)
  const port = configService.get("PORT", { infer: true })
  const applicationTitle = configService.get("APPLICATION_TITLE", {
    infer: true,
  })
  const applicationDescription = configService.get("APPLICATION_DESCRIPTION", {
    infer: true,
  })
  const nodeEnv = configService.get("NODE_ENV", { infer: true })

  // Enable debug mode
  if (nodeEnv.trim() === "local") {
    logger.debug("🔧 Debug mode enabled")
    logger.debug(`Environment: ${nodeEnv}`)
    logger.debug(`Port: ${port}`)
    logger.debug(`Application Title: ${applicationTitle}`)
  }

  const config = new DocumentBuilder()
    .setTitle(applicationTitle)
    .setDescription(applicationDescription)
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        in: "header",
        name: "Authorization",
      },
      "access-token",
    )
    .addServer("/", "local")
    .addServer("", "prod")
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup("docs", app, document, {
    jsonDocumentUrl: "swagger/json",
    yamlDocumentUrl: "swagger/yaml",
  })

  if (nodeEnv.trim() == "local") {
    new Documentation(document).buildTextDocumentation()
    logger.debug("📚 Documentation generated")
  }

  app.enableCors()

  app.listen(port, "0.0.0.0").then(() => {
    logger.log("🔥 HTTP Server Running!")
    logger.debug(`🚀 Server started on port ${port}`)
    logger.debug(`📖 Swagger docs available at http://localhost:${port}/docs`)
  })
}
bootstrap()
