import { ProjectSkill } from './project-skill';

export interface ProjectSkillCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<ProjectSkill>}
     */
    byId(id: number): Promise<ProjectSkill>
    
    /**
     * @param {ProjectSkill} projectSkill
     */
    store(projectSkill: ProjectSkill): Promise<ProjectSkill>;
}