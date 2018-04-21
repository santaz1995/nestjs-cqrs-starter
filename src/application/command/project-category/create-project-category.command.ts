import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectCategoryCommand implements ICommand {

    @IsString()
    @IsNotEmpty()
    readonly _title: string;

    constructor(title: string) {
        this._title = title;
    }

    get title(): string {
        return this._title;
    }
}
