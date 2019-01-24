import { EntityNotFoundException } from '../../../../../common/exceptions/entity-not-found.exception';

export class ProjectCategoryNotFoundException extends EntityNotFoundException {

    /**
     * @param {number} id
     * @returns {ProjectCategoryNotFoundException}
     */
    static fromId(id: number): ProjectCategoryNotFoundException {
        return new ProjectCategoryNotFoundException(`Project category with ID #${id} not found`);
    }
}