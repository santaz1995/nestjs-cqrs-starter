import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserQueryRepository } from '../../../modules/user/domain/user.query.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@Inject('UserQueryRepository') private userRepository: UserQueryRepository) {
        super({
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: '123',
            });
    }

    /**
     * Auto load validate user from Bearer token
     * @param payload
     */
    async validate(payload: JwtPayload) {

        const user = await this.userRepository.getByEmail(payload.email);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}