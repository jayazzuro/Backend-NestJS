import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PublicUser } from '../../common/types/public-user.type';
import { UsersRepository } from '../../users/users.repository';
import { jwtConstants } from '../constants/jwt.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { sub: number; email: string; role: string }): Promise<PublicUser> {
    const user = await this.usersRepository.findByIdPublic(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Token không hợp lệ');
    }

    return user;
  }
}
