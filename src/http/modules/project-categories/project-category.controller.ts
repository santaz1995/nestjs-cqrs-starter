import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProjectCategoryCommand } from '../../../application/command/project-category/create-project-category.command';
import { GetProjectCategoryCommand } from '../../../application/query/project-category/get-project-category.command';
import { UpdateProjectCategoryCommand } from '../../../application/command/project-category/update-project-category.command';
import { GetByIdProjectCategoryCommand } from '../../../application/query/project-category/get-by-id-project-category.command';
import { DeleteProjectCategoryCommand } from '../../../application/command/project-category/delete-project-category.command';

@Controller('project-categories')
export class ProjectCategoryController {

    constructor(private readonly commandBus: CommandBus) {
    }

    @Get()
    public async getAll() {

        return await this.commandBus.execute(
            new GetProjectCategoryCommand()
        );
    }

    @Get(':id')
    public async getById(@Param('id') id: number) {

        return await this.commandBus.execute(
            new GetByIdProjectCategoryCommand(id)
        );
    }

    @Post()
    public async store(@Body() request) {
        await this.commandBus.execute(
            new CreateProjectCategoryCommand(
                request.title
            )
        );
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() request) {

        await this.commandBus.execute(
            new UpdateProjectCategoryCommand(
                id,
                request.title
            )
        );
    }

    @Delete(':id')
    public async delete(@Param('id') id: number) {

        return await this.commandBus.execute(
            new DeleteProjectCategoryCommand(id)
        );
    }
}
