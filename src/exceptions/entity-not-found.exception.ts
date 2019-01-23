import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {

    /**
     * @param {string} message
     */
    constructor(message: string) {
        super(message, HttpStatus.NOT_FOUND);
    }
}