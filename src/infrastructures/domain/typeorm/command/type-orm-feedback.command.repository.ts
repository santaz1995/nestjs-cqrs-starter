import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { FeedbackRepository } from '../../../../domains/feedback/feedback.repository';
import { Feedback } from '../../../../domains/feedback/feedback';
import { TypeOrmCommandRepository } from './type-orm.command.repository';

@EntityRepository()
export class TypeOrmFeedbackCommandRepository extends TypeOrmCommandRepository implements FeedbackRepository {

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