import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePortfolioCommand } from './delete-portfolio.command';
import { PortfolioCommandRepository } from '../../../domains/portfolio/portfolio.command.repository';

@CommandHandler(DeletePortfolioCommand)
export class DeletePortfolioExecute implements ICommandHandler<DeletePortfolioCommand> {

    constructor(
        @Inject('PortfolioCommandRepository') private portfolioRepository: PortfolioCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {DeletePortfolioCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: DeletePortfolioCommand, resolve: (value?) => void) {

        resolve();

        const portfolio = await this.portfolioRepository.byId(command.id);

        portfolio.remove();

        const portfolioRegister = this.publisher.mergeObjectContext(
            await this.portfolioRepository.store(portfolio),
        );

        portfolioRegister.store(portfolio);
        portfolioRegister.commit();
    }
}
