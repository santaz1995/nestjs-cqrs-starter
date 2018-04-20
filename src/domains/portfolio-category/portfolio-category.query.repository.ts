import { PortfolioCategory } from "./portfolio-category";

export interface PortfolioCategoryQueryRepository {
    
    /**
     * @returns {Promise<Feedback[]>}
     */
    getAll(): Promise<PortfolioCategory[]>;

    /**
     * @returns {Promise<Feedback[]>}
     */
    getById(id: number): Promise<PortfolioCategory>;

    /**
     * @param {PortfolioCategory} portfolioCategory
     */
    store(portfolioCategory: PortfolioCategory): Promise<PortfolioCategory>;
}