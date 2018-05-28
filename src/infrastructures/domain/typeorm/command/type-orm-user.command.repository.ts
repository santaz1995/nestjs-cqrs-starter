import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmCommandRepository } from './type-orm.command.repository';
import { UserCommandRepository } from '../../../../domains/user/user.command.repository';
import { User } from '../../../../domains/user/user';

@EntityRepository()
export class TypeOrmUserCommandRepository extends TypeOrmCommandRepository implements UserCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    public async byId(id: number): Promise<User> {
        return this.createQueryBuilder().andWhere('u.id = :id').setParameter('id', id).getOne();
    }

    /**
     * @param {User} user
     * @returns {Promise<User>}
     */
    public async store(user: User): Promise<User> {
        return this.entityManager.save(user);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = User, alias: string = 'u'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}