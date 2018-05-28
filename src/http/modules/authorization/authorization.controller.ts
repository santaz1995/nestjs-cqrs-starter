import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpCommand } from '../../../application/command/authorization/sign-up.command';

@Controller('')
export class AuthorizationController {

    constructor(private readonly commandBus: CommandBus) {}

    @Post('sign-in')
    public async signIn(@Body() request) {
        /** TODO create */
        /*return await this.commandBus.execute(

        );*/
    }

    @Post('sign-up')
    public async signUp(@Body() request) {
        /** TODO create */
        await this.commandBus.execute(
            new SignUpCommand(
                request.email,
                request.password,
                request.firstName,
                request.lastName
            )
        );
    }
}
