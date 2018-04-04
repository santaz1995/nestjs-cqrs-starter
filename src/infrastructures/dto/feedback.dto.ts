import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FeedbackDto {

    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly subject: string;

    @IsString()
    @IsNotEmpty()
    readonly message: string;

    constructor(email: string, name: string, subject: string, message: string) {
        this.email = email;
        this.name = name;
        this.subject = subject;
        this.message = message;
    }

    /**
     * @param request
     * @returns {FeedbackDto}
     */
    static fromRequest(request) {
        return new FeedbackDto(
            request.email,
            request.name,
            request.subject,
            request.message,
        );
    }
}