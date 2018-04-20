import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { StorePortfolioCategoryEvent } from './store-portfolio-category.event';
import { Inject } from "@nestjs/common";
import { PortfolioCategoryQueryRepository } from '../../../domains/portfolio-category/portfolio-category.query.repository';

@EventsHandler(StorePortfolioCategoryEvent)
export class StorePortfolioCategoryHandler implements IEventHandler<StorePortfolioCategoryEvent> {

    constructor(
        @Inject('PortfolioCategoryQueryRepository') private portfolioCategoryRepository: PortfolioCategoryQueryRepository) {
    }

    async handle(portfolioCategory: StorePortfolioCategoryEvent) {
        await this.portfolioCategoryRepository.store(portfolioCategory.portfolioCategory);
    }
}
