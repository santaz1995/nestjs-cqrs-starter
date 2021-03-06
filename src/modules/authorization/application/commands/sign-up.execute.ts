import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SignUpCommand } from './sign-up.command';
import { User } from '../../../user/domain/user';
import { UserCommandRepository } from '../../../user/domain/user.command.repository';

@CommandHandler(SignUpCommand)
export class SignUpExecute implements ICommandHandler<SignUpCommand> {

    constructor(
        @Inject('UserCommandRepository') private userRepository: UserCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {SignUpCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: SignUpCommand, resolve: (value?) => void) {
        console.log(command.password);
        resolve();

        const user = User.register(
            command.email,
            bcrypt.hashSync(command.password, bcrypt.genSaltSync(10)),
            command.firstName,
            command.lastName,
        );

        const userRegister = this.publisher.mergeObjectContext(
            await this.userRepository.store(user),
        );

        userRegister.store(user);
        userRegister.commit();
    }
}
