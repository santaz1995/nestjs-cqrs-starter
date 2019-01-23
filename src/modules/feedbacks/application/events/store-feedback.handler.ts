import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StoreFeedbackEvent } from './store-feedback.event';
import { FeedbackQueryRepository } from '../../domain/feedback-query.repository';

@EventsHandler(StoreFeedbackEvent)
export class StoreFeedbackHandler implements IEventHandler<StoreFeedbackEvent> {

    constructor(
        @Inject('FeedbackQueryRepository') private feedbackRepository: FeedbackQueryRepository) {
    }

    /**
     * @param {StoreFeedbackEvent} event
     * @returns {Promise<void>}
     */
    async handle(event: StoreFeedbackEvent) {
        await this.feedbackRepository.store(event.feedback);
    }
}
