import { EntityRepository, getManager, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from '../../../../database/type-orm/type-orm.query.repository';
import { Project } from '../../domain/project';
import { ProjectNotFoundException } from '../../domain/project-not-found.exception';

@EntityRepository()
export class TypeOrmProjectQueryRepository extends TypeOrmQueryRepository implements TypeOrmProjectQueryRepository {

    constructor() {
        super(getManager('query'));
    }

    /**
     * @returns {Promise<Project>}
     */
    public getAll(): Promise<Project[]> {
        return this.createQueryBuilder()
            .leftJoinAndSelect('p.projectCategories', 'pc')
            .leftJoinAndSelect('p.projectImages', 'pi')
            .leftJoinAndSelect('p.projectSkills', 'ps')
            .getMany();
    }
    /**
     * @param {number} id
     * @returns {Promise<Project>}
     */
    public getById(id: number): Promise<Project> {
        return this.createQueryBuilder()
            .andWhere('p.id = :id')
            .setParameter('id', id)
            .leftJoinAndSelect('p.projectSkills', 'ps')
            .getOne()
            .then((project: Project) => {
                if (!project) throw ProjectNotFoundException.fromId(id);
                return project;
            });
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