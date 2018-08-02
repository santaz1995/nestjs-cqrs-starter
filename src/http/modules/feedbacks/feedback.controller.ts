import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus } from '@nestjs/cqrs';
import { CreateFeedbackCommand } from '../../../application/command/feedback/create-feedback.command';
import { GetFeedbacksCommand } from '../../../application/query/feedback/get-feedbacks.command';
import { GetByIdFeedbackCommand } from '../../../application/query/feedback/get-by-id-feedback.command';

@Controller('feedbacks')
export class FeedbackController {

    constructor(private readonly commandBus: CommandBus) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async getAll() {

        return await this.commandBus.execute(
            new GetFeedbacksCommand()
        );
    }

    @Get(':id')
    public async getById(@Param('id') id: number) {

        return await this.commandBus.execute(
            new GetByIdFeedbackCommand(id)
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
