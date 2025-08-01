# NestJS API Boilerplate

Uma API robusta construída com NestJS que inclui autenticação JWT, sistema de recuperação de senha e envio de emails.

## 🚀 Funcionalidades

### 🔐 Autenticação
- **JWT Authentication**: Login seguro com tokens JWT
- **Password Hashing**: Senhas criptografadas com bcryptjs
- **Session Management**: Gerenciamento de sessões de usuário

### 📧 Sistema de Email
- **Password Recovery**: Envio de emails para recuperação de senha
- **Email Templates**: Templates HTML responsivos
- **SMTP Configuration**: Configuração flexível de servidores SMTP

### 🛣️ Rotas Abertas (Open Routes)
- **Forgot Password**: Solicitação de recuperação de senha
- **Reset Password**: Redefinição de senha com token
- **Email Sending**: Sistema de envio de emails

## 📁 Estrutura do Projeto

```
src/
├── @types/                    # Tipos TypeScript customizados
├── core/                      # Core da aplicação
│   ├── docs/                  # Documentação
│   ├── either/                # Pattern Either para tratamento de erros
│   ├── errors/                # Classes de erro customizadas
│   ├── helpers/               # Helpers e utilitários
│   │   └── cryptography/      # Criptografia e hashing
│   ├── repositories/          # Interfaces de repositório
│   └── types/                 # Tipos compartilhados
├── domains/                   # Domínios da aplicação
│   ├── accounts/              # Gerenciamento de contas
│   ├── sessions/              # Autenticação e sessões
│   └── open-routes/           # Rotas públicas
│       ├── dto/               # Data Transfer Objects
│       ├── repositories/      # Repositórios
│       ├── services/          # Lógica de negócio
│       └── utils/             # Utilitários
│           └── emails-template/ # Templates de email
├── infra/                     # Infraestrutura
│   ├── auth/                  # Autenticação JWT
│   ├── emails/                # Serviço de email
│   ├── http/                  # Controllers e pipes
│   └── prisma/                # Configuração do Prisma
└── test/                      # Testes
    ├── factories/             # Factories para testes
    ├── repositories/          # Repositórios em memória
    └── provider/              # Providers mock
```

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework Node.js para APIs
- **Prisma**: ORM moderno para banco de dados
- **JWT**: Autenticação com JSON Web Tokens
- **bcryptjs**: Criptografia de senhas
- **nodemailer**: Envio de emails
- **class-validator**: Validação de dados
- **Swagger**: Documentação da API
- **Vitest**: Framework de testes

## 🔧 Configuração

### 1. Instalação

```bash
npm install
```

### 2. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/database"

# JWT
JWT_PRIVATE_KEY="your-jwt-private-key"
JWT_PUBLIC_KEY="your-jwt-public-key"

# Email Configuration
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_SECURITY=false
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-app-password"
MAIL_FROM="your-email@gmail.com"

# Frontend URL (for password reset links)
FRONTEND_URL="http://localhost:3000"

# Application
NODE_ENV="local"
PORT=3333
```

### 3. Banco de Dados

```bash
# Gerar migrations
npx prisma migrate dev

# Aplicar migrations
npx prisma migrate deploy
```

### 4. Executar a Aplicação

```bash
# Desenvolvimento
npm run start:dev

# Debug
npm run start:debug

# Produção
npm run start:prod
```

## 📚 Documentação da API

### Autenticação

#### POST /sessions
Login de usuário

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Resposta:**
```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "user-id",
    "name": "User Name",
    "email": "user@example.com",
    "whatsapp": "5511999999999",
    "avatar": "https://example.com/avatar.jpg",
    "id_profile": "profile-id"
  }
}
```

### Recuperação de Senha

#### POST /forgot-password
Solicitar recuperação de senha

```json
{
  "email": "user@example.com"
}
```

**Resposta:**
```json
{
  "message": "Password reset successfully"
}
```

#### POST /reset-password/:token
Redefinir senha com token

```json
{
  "password": "newPassword123"
}
```

**Resposta:**
```json
{
  "message": "Password reset successfully"
}
```

### Criação de Conta

#### POST /accounts
Criar nova conta

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "whatsapp": "5511999999999"
}
```

**Resposta:**
```json
{
  "id": "user-id",
  "name": "User Name",
  "email": "user@example.com",
  "whatsapp": "5511999999999",
  "avatar": null,
  "id_profile": "profile-id",
  "status": true
}
```

## 🧪 Testes

### Executar Todos os Testes
```bash
npm test
```

### Testes em Modo Watch
```bash
npm run test:watch
```

### Testes E2E
```bash
npm run test:e2e
```

### Cobertura de Testes
```bash
npm run test:cov
```

## 🔒 Segurança

### JWT Authentication
- Tokens JWT para autenticação
- Refresh tokens para renovação automática
- Validação de tokens em rotas protegidas

### Password Security
- Senhas criptografadas com bcryptjs
- Salt rounds configuráveis
- Validação de força de senha

### Email Security
- Templates HTML seguros
- Validação de tokens de recuperação
- Expiração automática de tokens

## 📧 Sistema de Email

### Configuração SMTP
O sistema suporta múltiplos provedores SMTP:

- **Gmail**: Configuração com App Passwords
- **Outlook**: Configuração com OAuth2
- **Custom SMTP**: Configuração manual

### Templates de Email
Templates HTML responsivos incluídos:

- **Password Recovery**: Template para recuperação de senha
- **Welcome Email**: Template de boas-vindas
- **Custom Templates**: Sistema extensível para novos templates

## 🏗️ Arquitetura

### Clean Architecture
- **Domains**: Lógica de negócio isolada
- **Infrastructure**: Implementações técnicas
- **Core**: Utilitários e helpers compartilhados

### Repository Pattern
- Interfaces para abstração de dados
- Implementações em memória para testes
- Implementações Prisma para produção

### Dependency Injection
- Injeção de dependências com NestJS
- Providers configuráveis
- Testes isolados com mocks

## 🚀 Deploy

### Docker
```bash
# Build da imagem
docker build -t nestjs-api .

# Executar container
docker run -p 3333:3333 nestjs-api
```

### Docker Compose
```bash
# Executar com banco de dados
docker-compose up -d
```

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev      # Modo desenvolvimento com hot reload
npm run start:debug    # Modo debug

# Build
npm run build          # Compilar TypeScript

# Testes
npm test               # Executar testes
npm run test:watch     # Testes em modo watch
npm run test:e2e       # Testes end-to-end
npm run test:cov       # Cobertura de testes

# Linting
npm run lint           # Executar ESLint
npm run format         # Formatar código com Prettier
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato através do email.

---

**Desenvolvido com ❤️ usando NestJS**
