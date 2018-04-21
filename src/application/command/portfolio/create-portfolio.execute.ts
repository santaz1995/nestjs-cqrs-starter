import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePortfolioCommand } from './create-portfolio.command';
import { PortfolioCommandRepository } from '../../../domains/portfolio/portfolio.command.repository';
import { Portfolio } from '../../../domains/portfolio/portfolio';

@CommandHandler(CreatePortfolioCommand)
export class CreatePortfolioExecute implements ICommandHandler<CreatePortfolioCommand> {

    constructor(
        @Inject('PortfolioCommandRepository') private portfolioRepository: PortfolioCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {CreatePortfolioCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: CreatePortfolioCommand, resolve: (value?) => void) {

        resolve();

        const portfolio = Portfolio.register(
            command.title,
            command.description,
            command.company,
            command.url,
            command.realestDate,
        );

        const feedbackRegister = this.publisher.mergeObjectContext(
            await this.portfolioRepository.store(portfolio),
        );

        feedbackRegister.store(portfolio);
        feedbackRegister.commit();
    }
}
