import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FeedbackDto } from '../../../infrastructures/dto/feedback.dto';
import { CreateFeedbackCommand } from '../../../application/command/feedback/create-feedback.command';

@Controller('feedbacks')
export class FeedbackController {

    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    public async store(@Body() dto: FeedbackDto) {

        await this.commandBus.execute(
            new CreateFeedbackCommand(dto)
        );
    }
}
