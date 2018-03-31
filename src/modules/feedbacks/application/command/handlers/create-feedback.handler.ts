import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateFeedbackCommand } from '../implements/create-feedback.command';
import { Feedback } from '../../../domains/feedback';
import { Inject } from '@nestjs/common';
import { FeedbackRepository } from '../../../domains/feedback.repository';

@CommandHandler(CreateFeedbackCommand)
export class CreateFeedbackHandler implements ICommandHandler<CreateFeedbackCommand> {

    constructor(
        @Inject('FeedbackRepository') private feedbackRepository: FeedbackRepository
        //private readonly repository: HeroRepository,
        //private readonly publisher: EventPublisher,
    ) {}

    public execute(command: CreateFeedbackCommand, resolve: (value?) => void) {

        const feedback = Feedback.register(
            command.dto.email,
            command.dto.name,
            command.dto.subject,
            command.dto.message,
        );

        this.feedbackRepository.store(feedback);

        resolve();

        /*const { heroId, dragonId } = command;
        const hero = this.publisher.mergeObjectContext(
            await this.repository.findOneById(+heroId),
        );
        hero.killEnemy(dragonId);
        hero.commit();
        resolve();*/
    }
}
