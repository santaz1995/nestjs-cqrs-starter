import { IEvent } from '@nestjs/cqrs';
import {PortfolioCategory} from "../../../domains/portfolio-category/portfolio-category";

export class StorePortfolioCategoryEvent implements IEvent {

    constructor(public portfolioCategory: PortfolioCategory) {
    }
}
