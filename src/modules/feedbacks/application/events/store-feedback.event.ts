import { IEvent } from '@nestjs/cqrs';
import { Feedback } from '../../domain/feedback';

export class StoreFeedbackEvent implements IEvent {

    readonly _feedback: Feedback;

    /**
     * @param {Feedback} feedback
     */
    constructor(feedback: Feedback) {
        this._feedback = feedback
    }

    /**
     * @returns {Feedback}
     */
    get feedback(): Feedback {
        return this._feedback;
    }
}
