import { Portfolio } from './portfolio';

export interface PortfolioCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<Portfolio>}
     */
    byId(id: number): Promise<Portfolio>
    
    /**
     * @param {Portfolio} portfolio
     */
    store(portfolio: Portfolio): Promise<Portfolio>;
}