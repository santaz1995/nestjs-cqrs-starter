import { CommandBus } from '@nestjs/cqrs';

export class AppController {

    protected commandBus;

    constructor(commandBus: CommandBus) {
        this.commandBus = commandBus;
    }
}
