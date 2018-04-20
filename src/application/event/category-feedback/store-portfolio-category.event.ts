import { IEvent } from '@nestjs/cqrs';
import { PortfolioCategory } from '../../../domains/portfolio-category/portfolio-category';

export class StorePortfolioCategoryEvent implements IEvent {

    readonly _portfolioCategory: PortfolioCategory;

    constructor(portfolioCategory: PortfolioCategory) {
        this._portfolioCategory = portfolioCategory;

    }

    /**
     * @returns {PortfolioCategory}
     */
    get portfolioCategory(): PortfolioCategory {
        return this._portfolioCategory
    }
}
