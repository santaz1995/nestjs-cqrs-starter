import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StoreProjectEvent } from './store-project.event';
import { ProjectQueryRepository } from '../../../domains/project/project.query.repository';

@EventsHandler(StoreProjectEvent)
export class StoreProjectHandler implements IEventHandler<StoreProjectEvent> {

    constructor(
        @Inject('ProjectQueryRepository') private projectRepository: ProjectQueryRepository) {
    }

    async handle(event: StoreProjectEvent) {
        await this.projectRepository.store(event.project);
    }
}
