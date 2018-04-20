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

    get email(): string {
        return this._email;
    }

    get name(): string {
        return this._name;
    }

    get subject(): string {
        return this._subject;
    }

    get message(): string {
        return this._message;
    }
}
