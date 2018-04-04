import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateFeedbackCommand } from './create-feedback.command';
import { Feedback } from '../../../domains/feedback/feedback';
import { Inject } from '@nestjs/common';
import { FeedbackRepository } from '../../../domains/feedback/feedback.repository';

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackExecute implements ICommandHandler<CreateFeedbackCommand> {

    constructor(
        @Inject('FeedbackCommandRepository') private feedbackRepository: FeedbackRepository,
        private readonly publisher: EventPublisher) {
        console.log('123')
    }

    /**
     * @param {CreateFeedbackCommand} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: CreateFeedbackCommand, resolve: (value?) => void) {

        const feedback = Feedback.register(
            command.dto.email,
            command.dto.name,
            command.dto.subject,
            command.dto.message,
        );

        const feedbackRegister = this.publisher.mergeObjectContext(
            await this.feedbackRepository.store(feedback),
        );
        console.log(feedbackRegister);
        feedbackRegister.create(1);
        feedbackRegister.commit();
        resolve();
    }
}
