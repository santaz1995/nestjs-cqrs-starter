import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StoreUserEvent } from './store-user.event';
import { UserQueryRepository } from '../../../domains/user/user.query.repository';

@EventsHandler(StoreUserEvent)
export class StoreUserHandler implements IEventHandler<StoreUserEvent> {

    constructor(
        @Inject('UserQueryRepository') private userRepository: UserQueryRepository) {
    }

    /**
     * @param {StoreUserEvent} event
     * @returns {Promise<void>}
     */
    async handle(event: StoreUserEvent) {
        await this.userRepository.store(event.user);
    }
}
