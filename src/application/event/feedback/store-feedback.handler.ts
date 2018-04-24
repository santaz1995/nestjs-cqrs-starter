import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FeedbackQueryRepository } from '../../../domains/feedback/feedback-query.repository';
import { StoreFeedbackEvent } from './store-feedback.event';

@EventsHandler(StoreFeedbackEvent)
export class StoreFeedbackHandler implements IEventHandler<StoreFeedbackEvent> {

    constructor(
        @Inject('FeedbackQueryRepository') private feedbackRepository: FeedbackQueryRepository) {
    }

    /**
     * @param {StoreFeedbackEvent} feedback
     * @returns {Promise<void>}
     */
    async handle(feedback: StoreFeedbackEvent) {
        await this.feedbackRepository.store(feedback.feedback);
    }
}
