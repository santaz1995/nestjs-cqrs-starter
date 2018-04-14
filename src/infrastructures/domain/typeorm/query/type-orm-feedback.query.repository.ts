import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { Feedback } from '../../../../domains/feedback/feedback';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { FeedbackQueryRepository } from '../../../../domains/feedback/feedback-query.repository';

@EntityRepository()
export class TypeOrmFeedbackQueryRepository extends TypeOrmQueryRepository implements FeedbackQueryRepository {

    /**
     * @returns {Promise<Feedback>}
     */
    public async getAll(): Promise<Feedback[]> {
        return this.createQueryBuilder().getMany();
    }

    /**
     * @param {Feedback} feedback
     * @returns {Promise<Feedback>}
     */
    public async store(feedback: Feedback): Promise<Feedback> {
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