import { SessionProps } from "../sessions.entity"

export class SessionResponseDto {
  user: SessionProps
  access_token: string
}
