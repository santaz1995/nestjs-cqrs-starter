import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UploadBase64Command } from '../../../application/command/upload/upload-base64.command';

@Controller('uploads')
export class UploadController {

    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    public async base64(@Body() request) {

        return await this.commandBus.execute(
            new UploadBase64Command(request.image)
        );
    }
}
