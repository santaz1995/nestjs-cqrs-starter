import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetProjectSkillCommand } from './application/queries/get-project-skill.command';
import { GetByIdProjectSkillCommand } from './application/queries/get-by-id-project-skill.command';
import { CreateProjectSkillCommand } from './application/commands/create-project-skill.command';
import { UpdateProjectSkillCommand } from './application/commands/update-project-skill.command';
import { DeleteProjectSkillCommand } from './application/commands/delete-project-skill.command';

@Controller('project-skills')
export class ProjectSkillController {

    constructor(private readonly commandBus: CommandBus) {
    }

    @Get()
    public async getAll() {

        return await this.commandBus.execute(
            new GetProjectSkillCommand()
        );
    }

    @Get(':id')
    public async getById(@Param('id') id: number) {

        return await this.commandBus.execute(
            new GetByIdProjectSkillCommand(id)
        );
    }

    @Post()
    public async store(@Body() request) {
        await this.commandBus.execute(
            new CreateProjectSkillCommand(
                request.title
            )
        );
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() request) {

        await this.commandBus.execute(
            new UpdateProjectSkillCommand(
                id,
                request.title
            )
        );
    }

    @Delete(':id')
    public async delete(@Param('id') id: number) {

        return await this.commandBus.execute(
            new DeleteProjectSkillCommand(id)
        );
    }
}
