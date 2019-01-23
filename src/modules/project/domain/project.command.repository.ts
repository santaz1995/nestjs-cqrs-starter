import { Project } from './project';

export interface ProjectCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<Project>}
     */
    byId(id: number): Promise<Project>
    
    /**
     * @param {Project} project
     */
    store(project: Project): Promise<Project>;
}