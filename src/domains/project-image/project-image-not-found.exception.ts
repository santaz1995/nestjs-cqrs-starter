import { EntityNotFoundException } from '../core/entity-not-found.exception';

export class ProjectImageNotFoundException extends EntityNotFoundException {

    /**
     * @param {number} id
     * @returns {ProjectImageNotFoundException}
     */
    static fromId(id: number): ProjectImageNotFoundException {
        return new ProjectImageNotFoundException(`Project image with ID #${id} not found`);
    }
}