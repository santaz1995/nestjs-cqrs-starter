import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePortfolioCategoryCommand } from "./create-portfolio-category.command";
import { PortfolioCategory } from "../../../domains/portfolio-category/portfolio-category";
import { PortfolioCategoryCommandRepository } from "../../../domains/portfolio-category/portfolio-category.command.repository";

@CommandHandler(CreatePortfolioCategoryCommand)
export class CreatePortfolioCategoryExecute implements ICommandHandler<CreatePortfolioCategoryCommand> {

    constructor(
        @Inject('PortfolioCategoryCommandRepository') private portfolioCategoryRepository: PortfolioCategoryCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {CreateFeedbackCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: CreatePortfolioCategoryCommand, resolve: (value?) => void) {

        const portfolioCategory = PortfolioCategory.register(
            command.dto.title,
        );

        const portfolioCategoryRegister = this.publisher.mergeObjectContext(
            await this.portfolioCategoryRepository.store(portfolioCategory),
        );

        portfolioCategoryRegister.create(portfolioCategory);
        portfolioCategoryRegister.commit();

        resolve();
    }
}
