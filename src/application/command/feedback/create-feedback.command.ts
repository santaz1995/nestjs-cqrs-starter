import { ICommand } from '@nestjs/cqrs';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateFeedbackCommand implements ICommand {

    @IsEmail()
    @IsNotEmpty()
    readonly _email: string;

    @IsString()
    @IsNotEmpty()
    readonly _name: string;

    @IsString()
    @IsNotEmpty()
    readonly _subject: string;

    @IsString()
    @IsNotEmpty()
    readonly _message: string;

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
