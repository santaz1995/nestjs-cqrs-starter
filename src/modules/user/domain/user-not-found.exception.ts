import { EntityNotFoundException } from '../../../exceptions/entity-not-found.exception';

export class UserNotFoundException extends EntityNotFoundException {

    /**
     * @returns {UserNotFoundException}
     */
    static authorized(): UserNotFoundException {
        return new UserNotFoundException('The email or password is incorrect. Try again, please.');
    }

    /**
     * @param {number} id
     * @returns {UserNotFoundException}
     */
    static fromId(id: number): UserNotFoundException {
        return new UserNotFoundException('User with ID #' + id + ' not found.');
    }

    /**
     * @param {string} email
     * @returns {UserNotFoundException}
     */
    static fromEmail(email: string): UserNotFoundException {
        return new UserNotFoundException('User with email ' + email + ' not found.');
    }
}