import { IEvent } from '@nestjs/cqrs';
import { Feedback } from '../../../domains/feedback/feedback';

export class StoreFeedbackEvent implements IEvent {

    readonly _feedback: Feedback;

    constructor(feedback: Feedback) {
        this._feedback = feedback
    }

    get feedback(): Feedback {
        return this._feedback;
    }
}
