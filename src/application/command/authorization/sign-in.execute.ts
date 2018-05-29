import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { SignInCommand } from './sign-in.command';
import { UserQueryRepository } from '../../../domains/user/user.query.repository';

@CommandHandler(SignInCommand)
export class SignInExecute implements ICommandHandler<SignInCommand> {

    constructor(
        @Inject('UserQueryRepository') private userRepository: UserQueryRepository) {
    }

    /**
     * @param {SignInCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: SignInCommand, resolve: (value?) => void) {

        const user = await this.userRepository.getByEmail(command.email);

        if (user && bcrypt.compareSync(command.password, user.password)) {
            const expiresIn = process.env.EXPIRES_IN;
            const accessToken =  {token: jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn })};
            console.log(accessToken);
            console.log(user);
        }

        resolve();
    }
}
