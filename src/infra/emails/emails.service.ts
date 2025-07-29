import nodemailer from "nodemailer"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { IEMailsService, IMailProps } from "./dto/emails.interface"
import { Env } from "../env"

@Injectable()
export class EmailsService implements IEMailsService {
  private client: nodemailer.Transporter

  constructor(private config: ConfigService<Env, true>) {
    this.config = config
    this.client = nodemailer.createTransport({
      host: config.get("MAIL_HOST", { infer: true }),
      port: config.get("MAIL_PORT", { infer: true }),
      secureConnection: config.get("MAIL_SECURITY", { infer: true }) === true,
      requireTLS: true,
      tls: {
        ciphers: "SSLv3",
      },
      auth: {
        user: config.get("MAIL_USER", { infer: true }),
        pass: config.get("MAIL_PASS", { infer: true }),
      },
    })
  }

  async sendMail({ to, subject, template }: IMailProps): Promise<void> {
    await this.client.sendMail({
      from: this.config.get("MAIL_FROM", { infer: true }),
      to,
      subject,
      html: template,
    })
  }
}
