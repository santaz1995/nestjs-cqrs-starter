import { EntityNotFoundException } from '../../../common/exceptions/entity-not-found.exception';

export class ProjectNotFoundException extends EntityNotFoundException {

    /**
     * @param {number} id
     * @returns {ProjectNotFoundException}
     */
    static fromId(id: number): ProjectNotFoundException {
        return new ProjectNotFoundException(`Project with ID #${id} not found`);
    }
}