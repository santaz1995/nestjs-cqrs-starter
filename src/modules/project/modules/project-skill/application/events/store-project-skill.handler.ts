import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StoreProjectSkillEvent } from './store-project-skill.event';
import { ProjectSkillQueryRepository } from '../../domain/project-skill.query.repository';

@EventsHandler(StoreProjectSkillEvent)
export class StoreProjectSkillHandler implements IEventHandler<StoreProjectSkillEvent> {

    constructor(
        @Inject('ProjectSkillQueryRepository') private projectSkillRepository: ProjectSkillQueryRepository) {
    }

    /**
     * @param {StoreProjectSkillEvent} event
     * @returns {Promise<void>}
     */
    async handle(event: StoreProjectSkillEvent) {
        await this.projectSkillRepository.store(event.projectSkill);
    }
}
