import { Body, Controller, FileInterceptor, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UploadBase64Command } from './application/command/upload-base64.command';
import { diskStorage } from 'multer'
import * as path from "path";
import * as fs from "fs";
import * as uuidv4 from 'uuid/v4';

@Controller('uploads')
export class UploadController {

    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    public async base64(@Body() request) {

        return await this.commandBus.execute(
            new UploadBase64Command(request.image)
        );
    }

    @Post('multipart')
    @UseInterceptors(FileInterceptor('file', {

        storage: diskStorage({
            destination: (req, file, callback) => {
                let folderPath = path.resolve('./public/uploads/');

                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }

                callback(null, folderPath);
            },
            filename: (req, file, callback) => {
                callback(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`)
            }
        }),

        fileFilter: (req, file, callback) => {

            if (!file) {
                return callback(new Error('Could not upload image.'), false);
            }

            if (!file.mimetype.startsWith('image/') || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new Error('Could not upload image. The file does not match the type: jpeg, png, gif.'), false);
            }

            callback(null, true);
        }
    }))
    public async multipart(@UploadedFile() file, @Req() request) {

        const imagePath = '/uploads/' + file.filename;

        return {
            message: 'Image has been uploaded successfully.',
            imagePath: imagePath,
            imageFullPath: request.protocol + '://' + request.get('host') + '/' + imagePath
        }
    }
}
