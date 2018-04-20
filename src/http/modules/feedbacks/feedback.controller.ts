import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateFeedbackCommand } from '../../../application/command/feedback/create-feedback.command';
import { GetFeedbacksCommand } from '../../../application/query/feedback/get-feedbacks.command';

@Controller('feedbacks')
export class FeedbackController {

    constructor(private readonly commandBus: CommandBus) {}

    @Get()
    public async getAll() {

        return await this.commandBus.execute(
            new GetFeedbacksCommand()
        );
    }

    @Post()
    public async store(@Body() request) {

        await this.commandBus.execute(
            new CreateFeedbackCommand(
                request.email,
                request.name,
                request.subject,
                request.message
            )
        );
    }
}
