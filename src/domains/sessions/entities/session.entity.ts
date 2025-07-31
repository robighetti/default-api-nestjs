import { SessionResponseDto } from "../dto/session.response.dto"

type SessionEntityProps = {
  user: {
    id: string
    name: string
    email: string
    whatsapp: string | null
    avatar: string | null
    id_profile: string
  }

  access_token: string
}

export class SessionEntity {
  constructor(private readonly props: SessionEntityProps) {}
  static fromEntity(items: SessionEntityProps): SessionEntity {
    return new SessionEntity({
      user: {
        id: items.user.id,
        name: items.user.name,
        email: items.user.email,
        whatsapp: items.user.whatsapp,
        avatar: items.user.avatar,
        id_profile: items.user.id_profile,
      },
      access_token: items.access_token,
    })
  }

  serialize(): SessionResponseDto {
    return {
      user: {
        id: this.props.user.id,
        name: this.props.user.name,
        email: this.props.user.email,
        whatsapp: this.props.user.whatsapp,
        avatar: this.props.user.avatar,
        id_profile: this.props.user.id_profile,
      },
      access_token: this.props.access_token,
    }
  }
}
