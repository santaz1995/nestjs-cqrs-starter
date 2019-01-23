import { ProjectImage } from './project-image';

export interface ProjectImageCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<ProjectImage>}
     */
    byId(id: number): Promise<ProjectImage>
    
    /**
     * @param {ProjectImage} projectImage
     */
    store(projectImage: ProjectImage): Promise<ProjectImage>;
}