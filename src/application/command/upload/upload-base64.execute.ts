import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { UploadBase64Command } from './upload-base64.command';
import * as fs from 'fs';
import * as uuidv4 from 'uuid/v4';

@CommandHandler(UploadBase64Command)
export class UploadBase64Execute implements ICommandHandler<UploadBase64Command> {

    /**
     * @param {UploadBase64Command} command
     * @param {(value?) => void} resolve
     * @returns {Promise<void>}
     */
    async execute(command: UploadBase64Command, resolve: (value?) => void) {

        const image = command.file.replace(/^data:image\/\w+;base64,/, '');
        const imageExt = command.file.split(';')[0].match(/jpeg|png|gif/)[0];

        fs.writeFile(`${command.folderPath}/${uuidv4()}.${imageExt}`, image, {encoding: 'base64'}, () => {
            /** TODO: Handle error */
        });

        resolve();
    }
}
