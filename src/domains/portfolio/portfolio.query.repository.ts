import { Portfolio } from './portfolio';

export interface PortfolioQueryRepository {
    
    /**
     * @returns {Promise<Feedback[]>}
     */
    getAll(): Promise<Portfolio[]>;

    /**
     * @returns {Promise<Feedback[]>}
     */
    getById(id: number): Promise<Portfolio>;

    /**
     * @param {Portfolio} portfolio
     */
    store(portfolio: Portfolio): Promise<Portfolio>;
}