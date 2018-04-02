import { ICommand } from '@nestjs/cqrs';
import { FeedbackDto } from '../../../infrastructures/dto/feedback.dto';

export class CreateFeedbackCommand implements ICommand {

    constructor(public readonly dto: FeedbackDto) {}
}
