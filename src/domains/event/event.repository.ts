import { Event } from './event';

export interface EventRepository {

    /**
     * @param {Event} event
     */
    store(event: Event): Promise<Event>;
}