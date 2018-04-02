import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateFeedbackCommand } from '../implements/create-feedback.command';
import { Feedback } from '../../../domains/feedback/feedback';
import { Inject } from '@nestjs/common';
import { FeedbackRepository } from '../../../domains/feedback/feedback.repository';

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackHandler implements ICommandHandler<CreateFeedbackCommand> {

    constructor(
        @Inject('FeedbackRepository') private feedbackRepository: FeedbackRepository
    ) {}

    public execute(command: CreateFeedbackCommand, resolve: (value?) => void) {

        resolve();

        const feedback = Feedback.register(
            command.dto.email,
            command.dto.name,
            command.dto.subject,
            command.dto.message,
        );

        this.feedbackRepository.store(feedback);
    }
}
