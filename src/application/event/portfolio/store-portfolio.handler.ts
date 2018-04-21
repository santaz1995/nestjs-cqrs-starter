import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StorePortfolioEvent } from './store-portfolio.event';
import { PortfolioQueryRepository } from '../../../domains/portfolio/portfolio.query.repository';

@EventsHandler(StorePortfolioEvent)
export class StorePortfolioHandler implements IEventHandler<StorePortfolioEvent> {

    constructor(
        @Inject('PortfolioQueryRepository') private portfolioRepository: PortfolioQueryRepository) {
    }

    async handle(event: StorePortfolioEvent) {
        await this.portfolioRepository.store(event.portfolio);
    }
}
