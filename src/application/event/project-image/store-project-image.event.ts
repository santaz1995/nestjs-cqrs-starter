import { IEvent } from '@nestjs/cqrs';
import { ProjectImage } from '../../../domains/project-image/project-image';

export class StoreProjectImageEvent implements IEvent {

    readonly _projectImage: ProjectImage;

    /**
     * @param {ProjectImage} projectImage
     */
    constructor(projectImage: ProjectImage) {
        this._projectImage = projectImage;

    }

    /**
     * @returns {ProjectCategory}
     */
    get projectImage(): ProjectImage {
        return this._projectImage
    }
}
