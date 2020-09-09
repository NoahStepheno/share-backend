import { registerAs } from '@nestjs/config'

export default registerAs('auth', () => ({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  audience: process.env.AUTH0_AUDIENCE,
}))