import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { PortfolioQueryRepository } from '../../../../domains/portfolio/portfolio.query.repository';
import { Portfolio } from '../../../../domains/portfolio/portfolio';

@EntityRepository()
export class TypeOrmPortfolioQueryRepository extends TypeOrmQueryRepository implements PortfolioQueryRepository {

    /**
     * @returns {Promise<Portfolio>}
     */
    public async getAll(): Promise<Portfolio[]> {
        return this.createQueryBuilder().getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<Portfolio>}
     */
    public async getById(id: number): Promise<Portfolio> {
        return this.createQueryBuilder().andWhere('p.id = :id').setParameter('id', id).getOne();
    }

    /**
     * @param {Portfolio} portfolio
     * @returns {Promise<Portfolio>}
     */
    public async store(portfolio: Portfolio): Promise<Portfolio> {
        return this.entityManager.save(portfolio);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = Portfolio, alias: string = 'p'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}