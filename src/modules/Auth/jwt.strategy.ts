import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy as BaseStrategy } from 'passport-jwt';
import { JWT_CONSTANT } from './Auth.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(BaseStrategy) {
  constructor() {
    super({
      jwtFromRequest(req) {
        return req.signedCookies?.token 
      },
      ignoreExpiration: false,
      secretOrKey: JWT_CONSTANT.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, nickname: payload.nickname };
  }

}
