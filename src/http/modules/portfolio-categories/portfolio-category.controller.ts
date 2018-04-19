import { Controller, Post, Body, Get, Param, Put, Delete } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { PortfolioCategoryDto } from "../../../infrastructures/dto/portfolio-category.dto";
import { CreatePortfolioCategoryCommand } from "../../../application/command/portfolio-category/create-portfolio-category.command";
import { GetPortfolioCategoryCommand } from "../../../application/query/portfolio-category/get-portfolio-category.command";
import { UpdatePortfolioCategoryCommand } from "../../../application/command/portfolio-category/update-portfolio-category.command";
import {GetByIdPortfolioCategoryCommand} from "../../../application/query/portfolio-category/get-by-id-portfolio-category.command";
import {DeletePortfolioCategoryCommand} from "../../../application/command/portfolio-category/delete-portfolio-category.command";

@Controller('portfolio-categories')
export class PortfolioCategoryController {

    constructor(private readonly commandBus: CommandBus) {}

    @Get()
    public async getAll() {

        return await this.commandBus.execute(
            new GetPortfolioCategoryCommand()
        );
    }

    @Get(':id')
    public async getById(@Param('id') id: number) {

        return await this.commandBus.execute(
            new GetByIdPortfolioCategoryCommand(id)
        );
    }

    @Post()
    public async store(@Body() dto: PortfolioCategoryDto) {
        await this.commandBus.execute(
            new CreatePortfolioCategoryCommand(dto)
        );
    }

    @Put(':id')
    public async update(@Param('id') id: number, @Body() dto: PortfolioCategoryDto) {

        await this.commandBus.execute(
            new UpdatePortfolioCategoryCommand(id, dto)
        );
    }

    @Delete(':id')
    public async delete(@Param('id') id: number) {

        return await this.commandBus.execute(
            new DeletePortfolioCategoryCommand(id)
        );
    }
}
