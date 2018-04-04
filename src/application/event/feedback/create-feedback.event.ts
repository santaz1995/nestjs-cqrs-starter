import { IEvent } from '@nestjs/cqrs';

export class CreateFeedbackEvent implements IEvent {

    constructor(public id: number) {
    }
}
