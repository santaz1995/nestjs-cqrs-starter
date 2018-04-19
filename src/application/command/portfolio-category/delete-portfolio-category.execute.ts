import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PortfolioCategoryCommandRepository } from "../../../domains/portfolio-category/portfolio-category.command.repository";
import { DeletePortfolioCategoryCommand } from "./delete-portfolio-category.command";

@CommandHandler(DeletePortfolioCategoryCommand)
export class DeletePortfolioCategoryExecute implements ICommandHandler<DeletePortfolioCategoryCommand> {

    constructor(
        @Inject('PortfolioCategoryCommandRepository') private portfolioCategoryRepository: PortfolioCategoryCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {DeletePortfolioCategoryCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: DeletePortfolioCategoryCommand, resolve: (value?) => void) {

        const portfolioCategory = await this.portfolioCategoryRepository.byId(command.id);

        portfolioCategory.remove();

        const portfolioCategoryRegister = this.publisher.mergeObjectContext(
            await this.portfolioCategoryRepository.store(portfolioCategory),
        );

        portfolioCategoryRegister.delete(command.id);
        portfolioCategoryRegister.commit();

        resolve();
    }
}
