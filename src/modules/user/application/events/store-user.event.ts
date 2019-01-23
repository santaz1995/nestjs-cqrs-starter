import { IEvent } from '@nestjs/cqrs';
import { User } from '../../domain/user';

export class StoreUserEvent implements IEvent {

    readonly _user: User;

    /**
     * @param {User} user
     */
    constructor(user: User) {
        this._user = user;
    }

    /**
     * @returns {User}
     */
    get user(): User {
        return this._user;
    }
}
