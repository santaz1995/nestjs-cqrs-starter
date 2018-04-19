import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PortfolioCategoryQueryRepository } from "../../../domains/portfolio-category/portfolio-category.query.repository";
import { GetByIdPortfolioCategoryCommand } from "./get-by-id-portfolio-category.command";

@CommandHandler(GetByIdPortfolioCategoryCommand)
export class GetByIdPortfolioCategoryExecute implements ICommandHandler<GetByIdPortfolioCategoryCommand> {

    constructor(
        @Inject('PortfolioCategoryQueryRepository') private portfolioCategoryRepository: PortfolioCategoryQueryRepository) {
    }

    /**
     * @param {GetByIdPortfolioCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetByIdPortfolioCategoryCommand, resolve: (value?) => void) {

        resolve(await this.portfolioCategoryRepository.getById(command.id));
    }
}
