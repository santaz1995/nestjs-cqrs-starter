import { ICommand } from '@nestjs/cqrs';
import * as path from 'path';

export class UploadBase64Command implements ICommand {

    readonly _file: string;

    readonly _folderPath: string;

    /**
     * @param {string} file
     * @param {string} folderPath
     */
    constructor(file: string, folderPath: string = './public/uploads') {
        this._file = file;
        this._folderPath = folderPath
    }

    /**
     * @returns string
     */
    get file(): string {
        return this._file;
    }

    /**
     * @returns string
     */
    get folderPath(): string {
        return path.resolve(this._folderPath);
    }
}
