import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { ProjectImageQueryRepository } from '../../../../domains/project-image/project-image.query.repository';
import { ProjectImage } from '../../../../domains/project-image/project-image';

@EntityRepository()
export class TypeOrmProjectImageQueryRepository extends TypeOrmQueryRepository implements ProjectImageQueryRepository {

    /**
     * @returns {Promise<ProjectCategory>}
     */
    public async getAll(id: number): Promise<ProjectImage[]> {
        return this.createQueryBuilder().andWhere('pi.projectId = :id').getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<ProjectCategory>}
     */
    public async getById(id: number): Promise<ProjectImage> {
        return this.createQueryBuilder().andWhere('pi.id = :id').setParameter('id', id).getOne();
    }

    /**
     * @param {ProjectImage} projectImage
     * @returns {Promise<ProjectImage>}
     */
    public async store(projectImage: ProjectImage): Promise<ProjectImage> {
        return this.entityManager.save(projectImage);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = ProjectImage, alias: string = 'pi'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}