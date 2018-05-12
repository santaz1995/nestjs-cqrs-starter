import { EntityNotFoundException } from '../core/entity-not-found.exception';

export class FeedbackNotFoundException extends EntityNotFoundException {

    /**
     * @param {number} id
     * @returns {ProjectNotFoundException}
     */
    static fromId(id: number): FeedbackNotFoundException {
        return new FeedbackNotFoundException(`Feedback with ID #${id} not found`);
    }
}