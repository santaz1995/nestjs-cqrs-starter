import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInCommand } from './sign-in.command';
import { UserQueryRepository } from '../../../user/domain/user.query.repository';
import { UserNotFoundException } from '../../../user/domain/user-not-found.exception';
import { JwtPayload } from '../../../../common/utils/jwt/jwt-payload.interface';

@CommandHandler(SignInCommand)
export class SignInExecute implements ICommandHandler<SignInCommand> {

    constructor(
        @Inject('UserQueryRepository') private userRepository: UserQueryRepository,
        private readonly jwtService: JwtService) {
    }

    /**
     * @param {SignInCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: SignInCommand, resolve: (value?) => void) {

        const user = await this.userRepository.getByEmail(command.email);
        const userPayload: JwtPayload = {email: user.email};

        if (user && bcrypt.compareSync(command.password, user.password)) {
            const accessToken = {token: this.jwtService.sign(userPayload)};
            resolve(accessToken);
        } else {
            throw UserNotFoundException.authorized();
        }
    }
}
