import { ICommand } from '@nestjs/cqrs';

export class SignUpCommand implements ICommand {

    readonly _email: string;

    readonly _password: string;

    readonly _firstName: string;

    readonly _lastName: string;


    /**
     * @param {string} email
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     */
    constructor(email: string, password: string, firstName: string, lastName: string) {
        this._email = email;
        this._password = password;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    /**
     * @returns {string}
     */
    get email(): string {
        return this._email;
    }

    /**
     * @returns {string}
     */
    get password(): string {
        return this._password;
    }

    /**
     * @returns {string}
     */
    get firstName(): string {
        return this._firstName;
    }

    /**
     * @returns {string}
     */
    get lastName(): string {
        return this._lastName;
    }
}
