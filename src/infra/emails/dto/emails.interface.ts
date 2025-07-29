export interface IMailProps {
  to: string
  subject: string
  template: string
}

export interface IEMailsService {
  sendMail(data: IMailProps): Promise<void>
}
