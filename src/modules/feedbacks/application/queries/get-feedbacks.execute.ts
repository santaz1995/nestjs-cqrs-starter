import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetFeedbacksCommand } from './get-feedbacks.command';
import { FeedbackQueryRepository } from '../../domain/feedback-query.repository';

@CommandHandler(GetFeedbacksCommand)
export class GetFeedbacksExecute implements ICommandHandler<GetFeedbacksCommand> {

    constructor(
        @Inject('FeedbackQueryRepository') private feedbackRepository: FeedbackQueryRepository) {
    }

    /**
     * @param {CreateFeedbackCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: GetFeedbacksCommand, resolve: (value?) => void) {

        resolve(await this.feedbackRepository.getAll());
    }
}
