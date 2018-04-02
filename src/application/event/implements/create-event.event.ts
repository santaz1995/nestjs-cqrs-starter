import { IEvent } from '@nestjs/cqrs';
import { FeedbackDto } from '../../../infrastructures/dto/feedback.dto';

export class CreateEventEvent implements IEvent {

    constructor(public readonly dto: FeedbackDto) {}
}
