import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PortfolioCategoryCommandRepository } from "../../../domains/portfolio-category/portfolio-category.command.repository";
import { UpdatePortfolioCategoryCommand } from "./update-portfolio-category.command";

@CommandHandler(UpdatePortfolioCategoryCommand)
export class UpdatePortfolioCategoryExecute implements ICommandHandler<UpdatePortfolioCategoryCommand> {

    constructor(
        @Inject('PortfolioCategoryCommandRepository') private portfolioCategoryRepository: PortfolioCategoryCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {UpdatePortfolioCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: UpdatePortfolioCategoryCommand, resolve: (value?) => void) {

        const portfolioCategory = await this.portfolioCategoryRepository.byId(command.id);

        portfolioCategory.title = command.dto.title;

        const portfolioCategoryRegister = this.publisher.mergeObjectContext(
            await this.portfolioCategoryRepository.store(portfolioCategory),
        );

        portfolioCategoryRegister.update(command.id, portfolioCategory);
        portfolioCategoryRegister.commit();

        resolve();
    }
}
