import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetByIdFeedbackCommand } from './get-by-id-feedback.command';
import { FeedbackQueryRepository } from '../../domain/feedback-query.repository';

@CommandHandler(GetByIdFeedbackCommand)
export class GetByIdFeedbackExecute implements ICommandHandler<GetByIdFeedbackCommand> {

    constructor(
        @Inject('FeedbackQueryRepository') private feedbackRepository: FeedbackQueryRepository) {
    }

    /**
     * @param {feedbackRepository} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetByIdFeedbackCommand, resolve: (value?) => void) {

        resolve(this.feedbackRepository.getById(command.id));
    }
}
