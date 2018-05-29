import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpCommand } from '../../../application/command/authorization/sign-up.command';
import { SignInCommand } from '../../../application/query/authorization/sign-in.command';

@Controller('')
export class AuthorizationController {

    constructor(private readonly commandBus: CommandBus) {}

    @Post('sign-in')
    public async signIn(@Body() request) {

        return await this.commandBus.execute(
            new SignInCommand(
                request.email,
                request.password
            )
        );
    }

    @Post('sign-up')
    public async signUp(@Body() request) {

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
