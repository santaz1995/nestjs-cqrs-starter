import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { ProjectQueryRepository } from '../../../../domains/project/project.query.repository';
import { Project } from '../../../../domains/project/project';

@EntityRepository()
export class TypeOrmProjectQueryRepository extends TypeOrmQueryRepository implements ProjectQueryRepository {

    /**
     * @returns {Promise<Project>}
     */
    public async getAll(): Promise<Project[]> {
        return this.createQueryBuilder()
            .leftJoinAndSelect('p.projectCategories', 'pc')
            .getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<Project>}
     */
    public async getById(id: number): Promise<Project> {
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