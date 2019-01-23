import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommandBus } from '@nestjs/cqrs';
import { GetFeedbacksCommand } from './application/queries/get-feedbacks.command';
import { GetByIdFeedbackCommand } from './application/queries/get-by-id-feedback.command';
import { CreateFeedbackCommand } from './application/commands/create-feedback.command';

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
