import { EntityRepository, getManager, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { TypeOrmQueryRepository } from './type-orm.query.repository';
import { ProjectSkillQueryRepository } from '../../../../domains/project-skill/project-skill.query.repository';
import { ProjectSkill } from '../../../../domains/project-skill/project-skill';
import { ProjectSkillNotFoundException } from '../../../../domains/project-skill/project-skill-not-found.exception';

@EntityRepository()
export class TypeOrmProjectSkillQueryRepository extends TypeOrmQueryRepository implements ProjectSkillQueryRepository {

    constructor() {
        super(getManager('query'));
    }

    /**
     * @returns {Promise<ProjectSkill>}
     */
    public getAll(): Promise<ProjectSkill[]> {
        return this.createQueryBuilder().getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<ProjectSkill>}
     */
    public getById(id: number): Promise<ProjectSkill> {
        return this.createQueryBuilder()
            .andWhere('ps.id = :id')
            .setParameter('id', id)
            .getOne()
            .then((projectSkill: ProjectSkill) => {
                if (!projectSkill) throw ProjectSkillNotFoundException.fromId(id);
                return projectSkill;
            });
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