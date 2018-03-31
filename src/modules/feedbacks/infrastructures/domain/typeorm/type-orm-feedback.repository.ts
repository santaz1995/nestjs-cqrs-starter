import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmRepository } from './type-orm.repository';
import { FeedbackRepository } from '../../../domains/feedback.repository';
import { Feedback } from '../../../domains/feedback';

@EntityRepository()
export class TypeOrmFeedbackRepository extends TypeOrmRepository implements FeedbackRepository {

    /**
     * @param {Feedback} feedback
     * @returns {Promise<Feedback>}
     */
    public store(feedback: Feedback): Promise<Feedback> {
        return this.entityManager.save(feedback);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = Feedback, alias: string = 'f'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}