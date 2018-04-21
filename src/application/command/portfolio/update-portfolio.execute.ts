import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePortfolioCommand } from './update-portfolio.command';
import { PortfolioCommandRepository } from '../../../domains/portfolio/portfolio.command.repository';

@CommandHandler(UpdatePortfolioCommand)
export class UpdatePortfolioExecute implements ICommandHandler<UpdatePortfolioCommand> {

    constructor(
        @Inject('PortfolioCommandRepository') private portfolioRepository: PortfolioCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {UpdatePortfolioCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: UpdatePortfolioCommand, resolve: (value?) => void) {

        resolve();

        const portfolio = await this.portfolioRepository.byId(command.id);

        portfolio.title = command.title;
        portfolio.description = command.description;
        portfolio.company = command.company;
        portfolio.url = command.url;
        portfolio.realestDate = command.realestDate;

        const portfolioRegister = this.publisher.mergeObjectContext(
            await this.portfolioRepository.store(portfolio),
        );

        portfolioRegister.store(portfolio);
        portfolioRegister.commit();
    }
}
