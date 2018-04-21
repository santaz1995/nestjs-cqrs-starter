import { ICommand } from '@nestjs/cqrs';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProjectCategoryCommand implements ICommand {

    @IsNumber()
    @IsNotEmpty()
    readonly _id: number;

    @IsString()
    @IsNotEmpty()
    readonly _title: string;

    constructor(id: number, title: string) {
        this._id = id;
        this._title = title;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }
}
