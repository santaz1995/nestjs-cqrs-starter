import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { UserQueryRepository } from '../../../../domains/user/user.query.repository';
import { User } from '../../../../domains/user/user';
import { UserNotFoundException } from '../../../../domains/user/user-not-found.exception';

@EntityRepository()
export class TypeOrmUserQueryRepository extends TypeOrmQueryRepository implements UserQueryRepository {

    /**
     * @returns {Promise<ProjectSkill>}
     */
    public getAll(): Promise<User[]> {
        return this.createQueryBuilder().getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<ProjectSkill>}
     */
    public getById(id: number): Promise<User> {
        return this.createQueryBuilder()
            .andWhere('u.id = :id')
            .setParameter('id', id)
            .getOne()
            .then((user: User) => {
                if (!user) throw UserNotFoundException.fromId(id);
                return user;
            });
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