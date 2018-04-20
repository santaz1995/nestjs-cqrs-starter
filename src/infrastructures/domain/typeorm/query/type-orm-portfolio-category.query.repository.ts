import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { PortfolioCategoryQueryRepository } from "../../../../domains/portfolio-category/portfolio-category.query.repository";
import { PortfolioCategory } from "../../../../domains/portfolio-category/portfolio-category";

@EntityRepository()
export class TypeOrmPortfolioCategoryQueryRepository extends TypeOrmQueryRepository implements PortfolioCategoryQueryRepository {

    /**
     * @returns {Promise<PortfolioCategory>}
     */
    public async getAll(): Promise<PortfolioCategory[]> {
        return this.createQueryBuilder().getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<PortfolioCategory>}
     */
    public async getById(id: number): Promise<PortfolioCategory> {
        return this.createQueryBuilder().andWhere('pc.id = :id').setParameter('id', id).getOne();
    }

    /**
     * @param {PortfolioCategory} portfolioCategory
     * @returns {Promise<PortfolioCategory>}
     */
    public async store(portfolioCategory: PortfolioCategory): Promise<PortfolioCategory> {
        return this.entityManager.save(portfolioCategory);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = PortfolioCategory, alias: string = 'pc'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}