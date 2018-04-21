import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetByIdPortfolioCommand } from './get-by-id-portfolio.command';
import { PortfolioQueryRepository } from '../../../domains/portfolio/portfolio.query.repository';

@CommandHandler(GetByIdPortfolioCommand)
export class GetByIdPortfolioExecute implements ICommandHandler<GetByIdPortfolioCommand> {

    constructor(
        @Inject('PortfolioQueryRepository') private portfolioRepository: PortfolioQueryRepository) {
    }

    /**
     * @param {portfolioRepository} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetByIdPortfolioCommand, resolve: (value?) => void) {

        resolve(await this.portfolioRepository.getById(command.id));
    }
}
