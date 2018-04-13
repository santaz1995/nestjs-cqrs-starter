import { IEvent } from '@nestjs/cqrs';
import { Feedback } from "../../../domains/feedback/feedback";

export class CreateFeedbackEvent implements IEvent {

    constructor(public feedback: Feedback) {
    }
}
