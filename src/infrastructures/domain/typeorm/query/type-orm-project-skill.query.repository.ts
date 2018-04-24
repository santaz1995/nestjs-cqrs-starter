import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { ProjectSkillQueryRepository } from '../../../../domains/project-skill/project-skill.query.repository';
import { ProjectSkill } from '../../../../domains/project-skill/project-skill';

@EntityRepository()
export class TypeOrmProjectSkillQueryRepository extends TypeOrmQueryRepository implements ProjectSkillQueryRepository {

    /**
     * @returns {Promise<ProjectSkill>}
     */
    public async getAll(): Promise<ProjectSkill[]> {
        return this.createQueryBuilder().getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<ProjectSkill>}
     */
    public async getById(id: number): Promise<ProjectSkill> {
        return this.createQueryBuilder().andWhere('ps.id = :id').setParameter('id', id).getOne();
    }

    /**
     * @param {ProjectSkill} projectSkill
     * @returns {Promise<ProjectSkill>}
     */
    public async store(projectSkill: ProjectSkill): Promise<ProjectSkill> {
        return this.entityManager.save(projectSkill);
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = ProjectSkill, alias: string = 'ps'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}