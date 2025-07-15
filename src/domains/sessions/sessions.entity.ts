export type SessionProps = {
  name: string
  email: string
}

export class SessionsEntity {
  constructor(private readonly props: SessionProps) {}

  serialize() {
    return {
      name: this.props.name,
      email: this.props.email,
    }
  }
}
