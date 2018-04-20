import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateFeedbackCommand } from './create-feedback.command';
import { Feedback } from '../../../domains/feedback/feedback';
import { Inject } from '@nestjs/common';
import { FeedbackCommandRepository } from '../../../domains/feedback/feedback-command.repository';

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackExecute implements ICommandHandler<CreateFeedbackCommand> {

    constructor(
        @Inject('FeedbackCommandRepository') private feedbackRepository: FeedbackCommandRepository,
        private readonly publisher: EventPublisher) {
    }

    /**
     * @param {CreateFeedbackCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: CreateFeedbackCommand, resolve: (value?) => void) {

        const feedback = Feedback.register(
            command.email,
            command.name,
            command.subject,
            command.message,
        );

        const feedbackRegister = this.publisher.mergeObjectContext(
            await this.feedbackRepository.store(feedback),
        );

        feedbackRegister.create(feedback);
        feedbackRegister.commit();

        resolve();
    }
}
