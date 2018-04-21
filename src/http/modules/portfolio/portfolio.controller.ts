import { Controller, Post, Body, Get, Put, Delete, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetPortfolioCommand } from '../../../application/query/portfolio/get-portfolio.command';
import { GetByIdPortfolioCommand } from '../../../application/query/portfolio/get-by-id-portfolio.command';
import { CreatePortfolioCommand } from '../../../application/command/portfolio/create-portfolio.command';
import { UpdatePortfolioCommand } from '../../../application/command/portfolio/update-portfolio.command';
import { DeletePortfolioCommand } from '../../../application/command/portfolio/delete-portfolio.command';

@Controller('portfolios')
export class PortfolioController {

    constructor(private readonly commandBus: CommandBus) {}

    @Get()
    public async getAll() {

        return await this.commandBus.execute(
            new GetPortfolioCommand()
        );
    }

    @Get(':id')
    public async getById(@Param('id') id: number) {

        return await this.commandBus.execute(
            new GetByIdPortfolioCommand(id)
        );
    }

    @Post()
    public async store(@Body() request) {
        await this.commandBus.execute(
            new CreatePortfolioCommand(
                request.title,
                request.description,
                request.company,
                request.url,
                request.realestDate,
            )
        );
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() request) {

        await this.commandBus.execute(
            new UpdatePortfolioCommand(
                id,
                request.title,
                request.description,
                request.company,
                request.url,
                request.realestDate,
            )
        );
    }

    @Delete(':id')
    public async delete(@Param('id') id: number) {

        return await this.commandBus.execute(
            new DeletePortfolioCommand(id)
        );
    }
}
