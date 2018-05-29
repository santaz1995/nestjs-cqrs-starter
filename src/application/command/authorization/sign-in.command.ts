import { ICommand } from '@nestjs/cqrs';

export class SignInCommand implements ICommand {

    readonly _email: string;

    readonly _password: string;

    /**
     * @param {string} email
     * @param {string} password
     */
    constructor(email: string, password: string) {
        this._email = email;
        this._password = password;
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
}
