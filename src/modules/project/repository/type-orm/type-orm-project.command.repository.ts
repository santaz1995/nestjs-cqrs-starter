import { EntityRepository, getManager, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmCommandRepository } from '../../../../database/type-orm/type-orm.command.repository';
import { Project } from '../../domain/project';

@EntityRepository()
export class TypeOrmProjectCommandRepository extends TypeOrmCommandRepository implements TypeOrmProjectCommandRepository {

    constructor() {
        super(getManager());
    }

    /**
     * @param {number} id
     * @returns {Promise<Project>}
     */
    public async byId(id: number): Promise<Project> {
        return this.createQueryBuilder().andWhere('p.id = :id').setParameter('id', id).getOne();
    }

    /**
     * @param {Project} project
     * @returns {Promise<Project>}
     */
    public async store(project: Project): Promise<Project> {
        return this.entityManager.save(project);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = Project, alias: string = 'p'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}