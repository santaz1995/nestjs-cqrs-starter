import { ProjectCategory } from './project-category';

export interface ProjectCategoryQueryRepository {
    
    /**
     * @returns {Promise<Feedback[]>}
     */
    getAll(): Promise<ProjectCategory[]>;

    /**
     * @returns {Promise<Feedback[]>}
     */
    getById(id: number): Promise<ProjectCategory>;

    /**
     * @param {ProjectCategory} projectCategory
     */
    store(projectCategory: ProjectCategory): Promise<ProjectCategory>;
}