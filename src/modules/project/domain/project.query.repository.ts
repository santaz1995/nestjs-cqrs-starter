import { Project } from './project';

export interface ProjectQueryRepository {
    
    /**
     * @returns {Promise<Feedback[]>}
     */
    getAll(): Promise<Project[]>;

    /**
     * @returns {Promise<Feedback[]>}
     */
    getById(id: number): Promise<Project>;

    /**
     * @param {Project} project
     */
    store(project: Project): Promise<Project>;
}