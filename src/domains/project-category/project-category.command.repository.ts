import { ProjectCategory } from './project-category';

export interface ProjectCategoryCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<ProjectCategory>}
     */
    byId(id: number): Promise<ProjectCategory>
    
    /**
     * @param {ProjectCategory} projectCategory
     */
    store(projectCategory: ProjectCategory): Promise<ProjectCategory>;
}