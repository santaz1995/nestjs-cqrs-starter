import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPortfolioCommand } from './get-portfolio.command';
import { PortfolioQueryRepository } from '../../../domains/portfolio/portfolio.query.repository';

@CommandHandler(GetPortfolioCommand)
export class GetPortfolioExecute implements ICommandHandler<GetPortfolioCommand> {

    constructor(
        @Inject('PortfolioQueryRepository') private portfolioRepository: PortfolioQueryRepository) {
    }

    /**
     * @param {GetPortfolioCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetPortfolioCommand, resolve: (value?) => void) {

        resolve(await this.portfolioRepository.getAll());
    }
}
