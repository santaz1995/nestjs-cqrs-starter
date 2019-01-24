import { EntityRepository, getManager, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmCommandRepository } from '../../../../common/database/type-orm/type-orm.command.repository';
import { FeedbackCommandRepository } from '../../domain/feedback-command.repository';
import { Feedback } from '../../domain/feedback';

@EntityRepository()
export class TypeOrmFeedbackCommandRepository extends TypeOrmCommandRepository implements FeedbackCommandRepository {

    constructor() {
        super(getManager());
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