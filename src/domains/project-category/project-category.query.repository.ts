import { ProjectCategory } from './project-category';

export interface ProjectCategoryQueryRepository {
    
    /**
     * @returns {Promise<ProjectCategory[]>}
     */
    getAll(): Promise<ProjectCategory[]>;

    /**
     * @returns {Promise<ProjectCategory[]>}
     */
    getById(id: number): Promise<ProjectCategory>;

    /**
     * @param {ProjectCategory} projectCategory
     */
    store(projectCategory: ProjectCategory): Promise<ProjectCategory>;
}