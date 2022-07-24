import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, IsEmail, MinLength, IsOptional } from 'class-validator';
import { IsStartWith } from '../../utils/request/validation/request.is-start-with.validation';

export class UserUpdateDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @Type(() => String)
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @Type(() => String)
    readonly lastName: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    @MaxLength(14)
    @Type(() => String)
    @IsStartWith(['+92'])
    readonly mobileNumber?: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(100)
    @Type(() => String)
    readonly email?: string;


}
