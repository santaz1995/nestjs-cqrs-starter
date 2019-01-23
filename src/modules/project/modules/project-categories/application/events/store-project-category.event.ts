import { IEvent } from '@nestjs/cqrs';
import { ProjectCategory } from '../../domain/project-category';

export class StoreProjectCategoryEvent implements IEvent {

    readonly _projectCategory: ProjectCategory;

    /**
     * @param {ProjectCategory} projectCategory
     */
    constructor(projectCategory: ProjectCategory) {
        
        this._projectCategory = projectCategory;

    }

    /**
     * @returns {ProjectCategory}
     */
    get projectCategory(): ProjectCategory {
        return this._projectCategory
    }
}
