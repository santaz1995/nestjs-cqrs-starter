import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmCommandRepository } from './type-orm.command.repository';
import { ProjectCategoryCommandRepository } from '../../../../domains/project-category/project-category.command.repository';
import { ProjectCategory } from '../../../../domains/project-category/project-category';

@EntityRepository()
export class TypeOrmProjectCategoryCommandRepository extends TypeOrmCommandRepository implements ProjectCategoryCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<ProjectCategory>}
     */
    public async byId(id: number): Promise<ProjectCategory> {
        return this.createQueryBuilder().andWhere('pc.id = :id').setParameter('id', id).getOne();
    }

    /**
     * @param {ProjectCategory} projectCategory
     * @returns {Promise<ProjectCategory>}
     */
    public async store(projectCategory: ProjectCategory): Promise<ProjectCategory> {
        return this.entityManager.save(projectCategory);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = ProjectCategory, alias: string = 'pc'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}