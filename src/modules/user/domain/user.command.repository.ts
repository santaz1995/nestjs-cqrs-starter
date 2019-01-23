import { User } from './user';

export interface UserCommandRepository {

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    byId(id: number): Promise<User>;
    
    /**
     * @param {User} user
     */
    store(user: User): Promise<User>;
}