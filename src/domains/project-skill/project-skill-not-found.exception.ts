import { EntityNotFoundException } from '../core/entity-not-found.exception';

export class ProjectSkillNotFoundException extends EntityNotFoundException {

    /**
     * @param {number} id
     * @returns {ProjectSkillNotFoundException}
     */
    static fromId(id: number): ProjectSkillNotFoundException {
        return new ProjectSkillNotFoundException(`Project skill with ID #${id} not found`);
    }
}