import { EntityManager, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';

export abstract class TypeOrmQueryRepository {

    protected entityManager: EntityManager;

    protected constructor(entityManager: EntityManager) {
        this.entityManager =  entityManager;
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected abstract createQueryBuilder(entityClass: ObjectType<any>, alias: string): SelectQueryBuilder<any>;
}