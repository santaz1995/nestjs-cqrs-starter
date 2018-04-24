import { ProjectSkill } from './project-skill';

export interface ProjectSkillQueryRepository {
    
    /**
     * @returns {Promise<ProjectSkill[]>}
     */
    getAll(): Promise<ProjectSkill[]>;

    /**
     * @returns {Promise<ProjectSkill[]>}
     */
    getById(id: number): Promise<ProjectSkill>;

    /**
     * @param {ProjectSkill} projectSkill
     */
    store(projectSkill: ProjectSkill): Promise<ProjectSkill>;
}