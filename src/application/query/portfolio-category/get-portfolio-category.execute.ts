import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPortfolioCategoryCommand } from "./get-portfolio-category.command";
import { PortfolioCategoryQueryRepository } from "../../../domains/portfolio-category/portfolio-category.query.repository";

@CommandHandler(GetPortfolioCategoryCommand)
export class GetPortfolioCategoryExecute implements ICommandHandler<GetPortfolioCategoryCommand> {

    constructor(
        @Inject('PortfolioCategoryQueryRepository') private portfolioCategoryRepository: PortfolioCategoryQueryRepository) {
    }

    /**
     * @param {GetPortfolioCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetPortfolioCategoryCommand, resolve: (value?) => void) {

        resolve(await this.portfolioCategoryRepository.getAll());
    }
}
