import {
    IsNotEmpty,
    IsMongoId,
    IsNumber, IsPositive, Min, Max,
} from 'class-validator';

export class MovieRatingCreateDto {
    @IsMongoId()
    @IsNotEmpty()
    readonly movie: string;

    @IsPositive()
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 0 })
    @Min(1)
    @Max(5)
    readonly rating: string;



}
