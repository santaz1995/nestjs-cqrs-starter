import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateFeedbackEvent } from './create-feedback.event';
//import { Inject } from '@nestjs/common';
//import { FeedbackRepository } from '../../../../domains/feedback/feedback.repository';

@EventsHandler(CreateFeedbackEvent)
export class CreateFeedbackHandler implements IEventHandler<CreateFeedbackEvent> {

    handle(event: CreateFeedbackEvent) {
        console.log('qwe33');
    }
}
