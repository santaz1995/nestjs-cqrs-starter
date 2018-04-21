import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmCommandRepository } from './type-orm.command.repository';
import { PortfolioCommandRepository } from '../../../../domains/portfolio/portfolio.command.repository';
import { Portfolio } from '../../../../domains/portfolio/portfolio';

@EntityRepository()
export class TypeOrmPortfolioCommandRepository extends TypeOrmCommandRepository implements PortfolioCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<Portfolio>}
     */
    public async byId(id: number): Promise<Portfolio> {
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