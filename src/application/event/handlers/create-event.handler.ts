import { CommandHandler, IEventHandler } from '@nestjs/cqrs';
import { CreateEventEvent } from '../implements/create-event.event';

@CommandHandler(CreateEventEvent)
export class CreateEventHandler implements IEventHandler<CreateEventEvent> {

    constructor(
        //@Inject('EventRepository') private eventRepository: EventRepository
        //private readonly repository: HeroRepository,
        //private readonly publisher: EventPublisher,
    ) {}

    handle(event: CreateEventEvent) {
        console.log(('Async HeroFoundItemEvent...'));
    }
}
