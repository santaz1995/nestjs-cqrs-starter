import { User } from './user';

export interface UserQueryRepository {
    
    /**
     * @returns {Promise<User[]>}
     */
    getAll(): Promise<User[]>;

    /**
     * @returns {Promise<User[]>}
     */
    getById(id: number): Promise<User>;

    /**
     * @returns {Promise<User[]>}
     */
    getByEmail(email: string): Promise<User>;

    /**
     * @param {User} user
     */
    store(user: User): Promise<User>;
}