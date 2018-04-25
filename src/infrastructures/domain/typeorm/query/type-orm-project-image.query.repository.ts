import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { ProjectImageQueryRepository } from '../../../../domains/project-image/project-image.query.repository';
import { ProjectImage } from '../../../../domains/project-image/project-image';
import { ProjectImageNotFoundException } from '../../../../domains/project-image/project-image-not-found.exception';

@EntityRepository()
export class TypeOrmProjectImageQueryRepository extends TypeOrmQueryRepository implements ProjectImageQueryRepository {

    /**
     * @returns {Promise<ProjectCategory>}
     */
    public getAll(id: number): Promise<ProjectImage[]> {
        return this.createQueryBuilder().andWhere('pi.projectId = :id').getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<ProjectCategory>}
     */
    public getById(id: number): Promise<ProjectImage> {
        return this.createQueryBuilder()
            .andWhere('pi.id = :id')
            .setParameter('id', id)
            .getOne()
            .then((projectImage: ProjectImage) => {
                if (!projectImage) throw ProjectImageNotFoundException.fromId(id);
                return projectImage;
            });
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