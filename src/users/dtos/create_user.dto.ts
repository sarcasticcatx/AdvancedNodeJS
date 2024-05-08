import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 30)
    password: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
}