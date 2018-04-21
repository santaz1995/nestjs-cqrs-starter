import { IEvent } from '@nestjs/cqrs';
import { ProjectCategory } from '../../../domains/project-category/project-category';

export class StoreProjectCategoryEvent implements IEvent {

    readonly _projectCategory: ProjectCategory;

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
