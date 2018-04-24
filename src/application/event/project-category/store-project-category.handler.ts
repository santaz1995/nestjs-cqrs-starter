import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StoreProjectCategoryEvent } from './store-project-category.event';
import { ProjectCategoryQueryRepository } from '../../../domains/project-category/project-category.query.repository';

@EventsHandler(StoreProjectCategoryEvent)
export class StoreProjectCategoryHandler implements IEventHandler<StoreProjectCategoryEvent> {

    constructor(
        @Inject('ProjectCategoryQueryRepository') private projectCategoryRepository: ProjectCategoryQueryRepository) {
    }

    /**
     * @param {StoreProjectCategoryEvent} event
     * @returns {Promise<void>}
     */
    async handle(event: StoreProjectCategoryEvent) {
        await this.projectCategoryRepository.store(event.projectCategory);
    }
}
