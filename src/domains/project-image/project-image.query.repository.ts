import { ProjectImage } from './project-image';

export interface ProjectImageQueryRepository {
    
    /**
     * @returns {Promise<ProjectImage[]>}
     */
    getAll(id: number): Promise<ProjectImage[]>;

    /**
     * @returns {Promise<ProjectImage[]>}
     */
    getById(id: number): Promise<ProjectImage>;

    /**
     * @param {ProjectCategory} projectCategory
     */
    store(projectCategory: ProjectImage): Promise<ProjectImage>;
}