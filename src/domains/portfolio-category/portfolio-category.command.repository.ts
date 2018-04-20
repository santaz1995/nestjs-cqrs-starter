import { PortfolioCategory } from "./portfolio-category";

export interface PortfolioCategoryCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<PortfolioCategory>}
     */
    byId(id: number): Promise<PortfolioCategory>
    
    /**
     * @param {PortfolioCategory} portfolioCategory
     */
    store(portfolioCategory: PortfolioCategory): Promise<PortfolioCategory>;
}