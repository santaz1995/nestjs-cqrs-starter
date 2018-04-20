import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StorePortfolioCategoryEvent } from './store-portfolio-category.event';
import { PortfolioCategoryQueryRepository } from '../../../domains/portfolio-category/portfolio-category.query.repository';

@EventsHandler(StorePortfolioCategoryEvent)
export class StorePortfolioCategoryHandler implements IEventHandler<StorePortfolioCategoryEvent> {

    constructor(
        @Inject('PortfolioCategoryQueryRepository') private portfolioCategoryRepository: PortfolioCategoryQueryRepository) {
    }

    async handle(event: StorePortfolioCategoryEvent) {
        await this.portfolioCategoryRepository.store(event.portfolioCategory);
    }
}
