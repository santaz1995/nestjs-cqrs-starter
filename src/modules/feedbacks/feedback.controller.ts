import { Controller, Post, Body } from '@nestjs/common';
import { serialize } from 'class-transformer';
import { CommandBus } from '@nestjs/cqrs';
import { FeedbackDto } from './infrastructures/dto/feedback.dto';
import { CreateFeedbackCommand } from './application/command/implements/create-feedback.command';

@Controller('feedback')
export class FeedbackController {

    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    public async store(@Body() dto: FeedbackDto) {

        serialize(await this.commandBus.execute(
            new CreateFeedbackCommand(FeedbackDto.fromRequest(dto))
        ));
    }
}
