import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetProjectCommand } from './application/queries/get-project.command';
import { GetByIdProjectCommand } from './application/queries/get-by-id-project.command';
import { CreateProjectCommand } from './application/commands/create-project.command';
import { UpdateProjectCommand } from './application/commands/update-project.command';
import { DeleteProjectCommand } from './application/commands/delete-project.command';

@Controller('projects')
export class ProjectController {

    constructor(private readonly commandBus: CommandBus) {}

    @Get()
    public async getAll() {

        return await this.commandBus.execute(
            new GetProjectCommand()
        );
    }

    @Get(':id')
    public async getById(@Param('id') id: number) {

        return await this.commandBus.execute(
            new GetByIdProjectCommand(id)
        );
    }

    @Post()
    public async store(@Body() request) {

        await this.commandBus.execute(
            new CreateProjectCommand(
                request.title,
                request.description,
                request.company,
                request.url,
                request.realestDate,
                request.projectCategories,
            )
        );
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() request) {

        await this.commandBus.execute(
            new UpdateProjectCommand(
                id,
                request.title,
                request.description,
                request.company,
                request.url,
                request.realestDate,
                request.projectCategories,
            )
        );
    }

    @Delete(':id')
    public async delete(@Param('id') id: number) {

        return await this.commandBus.execute(
            new DeleteProjectCommand(id)
        );
    }
}
