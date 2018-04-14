import { Controller, Post, Body, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FeedbackDto } from '../../../infrastructures/dto/feedback.dto';
import { CreateFeedbackCommand } from '../../../application/command/feedback/create-feedback.command';
import { GetFeedbacksCommand } from '../../../application/query/feedback/get-feedbacks.command';

@Controller('feedbacks')
export class FeedbackController {

    constructor(private readonly commandBus: CommandBus) {}

    @Get()
    public async getAll() {

        await this.commandBus.execute(
            new GetFeedbacksCommand()
        );
    }

    @Post()
    public async store(@Body() dto: FeedbackDto) {

        await this.commandBus.execute(
            new CreateFeedbackCommand(dto)
        );
    }
}
