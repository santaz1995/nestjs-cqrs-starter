import { IEvent } from '@nestjs/cqrs';
import { Portfolio } from '../../../domains/portfolio/portfolio';

export class StorePortfolioEvent implements IEvent {

    readonly _portfolio: Portfolio;

    constructor(portfolio: Portfolio) {
        this._portfolio = portfolio;

    }

    /**
     * @returns {Portfolio}
     */
    get portfolio(): Portfolio {
        return this._portfolio
    }
}
