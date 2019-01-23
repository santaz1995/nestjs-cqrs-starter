import { ICommand } from '@nestjs/cqrs';

export class CreateFeedbackCommand implements ICommand {

    readonly _email: string;

    readonly _name: string;

    readonly _subject: string;

    readonly _message: string;

    /**
     * @param {string} email
     * @param {string} name
     * @param {string} subject
     * @param {string} message
     */
    constructor(email: string, name: string, subject: string, message: string) {
        this._email = email;
        this._name = name;
        this._subject = subject;
        this._message = message;
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
    get name(): string {
        return this._name;
    }

    /**
     * @returns {string}
     */
    get subject(): string {
        return this._subject;
    }

    /**
     * @returns {string}
     */
    get message(): string {
        return this._message;
    }
}
