import { EntityRepository, getManager, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from '../../../../common/database/type-orm/type-orm.query.repository';
import { UserQueryRepository } from '../../domain/user.query.repository';
import { User } from '../../domain/user';
import { UserNotFoundException } from '../../domain/user-not-found.exception';

@EntityRepository()
export class TypeOrmUserQueryRepository extends TypeOrmQueryRepository implements UserQueryRepository {

    constructor() {
        super(getManager('query'));
    }

    /**
     * @returns {Promise<User>}
     */
    public getAll(): Promise<User[]> {
        return this.createQueryBuilder().getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
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
     * @param {string} email
     * @returns {Promise<User>}
     */
    public getByEmail(email: string): Promise<User> {

        return this.createQueryBuilder()
            .andWhere('u.email = :email')
            .setParameter('email', email)
            .getOne()
            .then((user: User) => {
                if (!user) throw UserNotFoundException.fromEmail(email);
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