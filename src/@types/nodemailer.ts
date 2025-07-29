import "nodemailer"

declare module "nodemailer" {
  export interface TransportOptions {
    secureConnection: boolean
  }
}
