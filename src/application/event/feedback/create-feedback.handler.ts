import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateFeedbackEvent } from './create-feedback.event';
import { Inject } from "@nestjs/common";
import { FeedbackRepository } from "../../../domains/feedback/feedback.repository";

@EventsHandler(CreateFeedbackEvent)
export class CreateFeedbackHandler implements IEventHandler<CreateFeedbackEvent> {

    constructor(
        @Inject('FeedbackQueryRepository') private feedbackRepository: FeedbackRepository) {
    }

    async handle(feedback: CreateFeedbackEvent) {
        await this.feedbackRepository.store(feedback.feedback);
    }
}
