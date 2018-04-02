import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmMongoRepository } from './type-orm-mongo.repository';
import { EventRepository } from '../../../../domains/event/event.repository';
import { Event } from '../../../../domains/event/event';

@EntityRepository()
export class TypeOrmEventRepository extends TypeOrmMongoRepository implements EventRepository {

    /**
     * @param {Event} event
     * @returns {Promise<Event>}
     */
    public store(event: Event): Promise<Event> {
        return this.entityManager.save(event);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = Event, alias: string = 'e'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}