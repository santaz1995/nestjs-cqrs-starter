import { IsNotEmpty, IsString } from 'class-validator';

export class PortfolioCategoryDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    constructor(title: string) {
        this.title = title;
    }

    /**
     * @param request
     * @returns {PortfolioCategoryDto}
     */
    static fromRequest(request) {
        return new PortfolioCategoryDto(
            request.title,
        );
    }
}