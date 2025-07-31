import { IEMailsService, IMailProps } from "@/infra/emails/dto/emails.interface"

export class EmailsServiceMock implements IEMailsService {
  async sendMail({ to, subject, template }: IMailProps): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simula envio de email
        console.log(
          `Sending email to ${to} with subject "${subject}" and template "${template}"`,
        )
        resolve()
      }, 1000)
    })
  }
}
