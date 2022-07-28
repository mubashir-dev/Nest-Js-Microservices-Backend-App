import { IsString, IsNotEmpty } from 'class-validator';

export class UserMoviePreferenceCreateDto {
    @IsString()
    @IsNotEmpty()
    readonly category: string;
}
