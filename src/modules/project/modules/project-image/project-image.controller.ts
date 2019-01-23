import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetProjectImageCommand } from './application/queries/get-project-image.command';
import { CreateProjectImageCommand } from './application/commands/create-project-image.command';
import { DeleteProjectImageCommand } from './application/commands/delete-project-image.command';

@Controller('projects/:id/images')
export class ProjectImageController {

    constructor(private readonly commandBus: CommandBus) {
    }

    @Get()
    public async getAll(@Param('id') id: number) {

        /**
         * TODO: Add serialize image data
         */
        return await this.commandBus.execute(
            new GetProjectImageCommand(id)
        );
    }

    @Post()
    public async store(@Param('id') id: number, @Body() request) {

        await this.commandBus.execute(
            new CreateProjectImageCommand(
                id,
                request.imagePath,
            )
        );
    }

    @Delete(':id')
    public async delete(@Param('id') id: number) {

        return await this.commandBus.execute(
            new DeleteProjectImageCommand(id)
        );
    }
}
