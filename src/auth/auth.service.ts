import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dtos/create_user.dto';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    //1 register
    async registerUser(userData: CreateUserDto) {
        //cheking if the user exist first
        const foundUser = await this.usersService.getUserByEmail(userData.email);

        if(foundUser) throw new BadRequestException("email already in use");

        //hasbrown the pass
        const hashedPass = await hash(userData.password, 8);

        userData.password = hashedPass;

        //save user in database
        await this.usersService.createUser(userData);
    }
    //fbi credentials

    //2. login (show em ur badge ;))
    async loginUser(credentials: CredentialsDto) {
        const foundUser = await this.usersService.getUserByEmail(credentials.email);

        if(!foundUser) throw new UnauthorizedException('inavild credentials u has there bro');
        
        const isPassValid = await compare(credentials.password, foundUser.password);

        if(!isPassValid) throw new UnauthorizedException("not today bro/invalid credentials");

        const token = await this.jwtService.signAsync({ id: foundUser.id});

        const refreshToken = await this.jwtService.signAsync({id: foundUser.id}, {secret: this.configService.get("REFRESH_TOKEN_SECRET"),
            expiresIn: '3d'
        });

        await this.usersService.saveToken(foundUser.id, refreshToken);

        delete foundUser.refreshToken;
        delete foundUser.password;

        return {
            user: foundUser,
            token,
            refreshToken,
        };
    }

    //logo out 
    async logoutUser(refreshToken:string) {
        try {
            //1. verify refresh token
            const { id} = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('REFRESH_TOKEN_SECRET')
            });
            //2. delete token refresh
            await this.usersService.deleteToken(id, refreshToken);
        } catch (error) {
            throw new BadRequestException("Cant logout the user")
        }
    }
//? refresh tokens and delete  / 3 za 100
async refreshAccessToken(refreshToken: string) {
    try {
        //1. verify the refresh token 
        const { id} = await this.jwtService.verifyAsync(refreshToken, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        });

        //2. find the token in the database
        const foundUser = await this.usersService.getUserById(id);

        //3. checj if the token exist in the database
        const tokenExists = foundUser.refreshToken.some((token) => token === refreshToken);

        if (!tokenExists ) throw new Error();

        //4. generate new tokens
        const newAccessToken = await this.jwtService.signAsync({
            id: foundUser.id,
        });

        const newRefreshToken = await this.jwtService.signAsync({
            id: foundUser.id
        }, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            expiresIn: '3d'
        });

        //5. delete old refresh token and save new token in databee
        await this.usersService.deleteToken(foundUser.id, refreshToken);
        await this.usersService.saveToken(foundUser.id, newRefreshToken)

        return {
            token: newAccessToken, 
            refreshToken: newRefreshToken,
        };
    } catch (error) {
        throw new ForbiddenException();
    }
}



}
