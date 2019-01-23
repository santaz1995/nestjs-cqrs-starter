import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StoreProjectEvent } from './store-project.event';
import { ProjectQueryRepository } from '../../domain/project.query.repository';

@EventsHandler(StoreProjectEvent)
export class StoreProjectHandler implements IEventHandler<StoreProjectEvent> {

    constructor(
        @Inject('TypeOrmProjectQueryRepository') private projectRepository: ProjectQueryRepository) {
    }

    /**
     * @param {StoreProjectEvent} event
     * @returns {Promise<void>}
     */
    async handle(event: StoreProjectEvent) {
        await this.projectRepository.store(event.project);
    }
}
