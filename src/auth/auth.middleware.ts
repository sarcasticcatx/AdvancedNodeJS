import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { UsersService } from "src/users/users.service";

@Injectable() // razgledaj go ova utre
export class AuthMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService,
        private jtwService: JwtService,
        private configService: ConfigService,
    ) {}

    async use(req: Request, res: Response, next: NextFunction ) {
        const refreshToken = req.headers['refresh-token'];

        if (refreshToken) {
            try {
              //1. Verify refresh token
              const { id } = await this.jtwService.verifyAsync(
                refreshToken.toString(),
                {
                  secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                },
              );
              //2. Find user in db
              const foundUser = await this.usersService.getUserById(id);
              //3. Check if token exists in db
              const tokenExists = foundUser.refreshToken.some(
                (token) => token === refreshToken,
              );
      
              if (!tokenExists) throw new Error();
      
              //4. generate new tokens
              const newAccessToken = await this.jtwService.signAsync({
                id: foundUser.id,
              });
      
              const newRefreshToken = await this.jtwService.signAsync(
                { id: foundUser.id },
                {
                  secret: this.configService.get('REFRESH_TOKEN_SECRET'),
                  expiresIn: '7d',
                },
              );
      
              //5. delete old refresh token and save new refresh token in databee
              await this.usersService.deleteToken(
                foundUser.id,
                refreshToken.toString(),
              );
              await this.usersService.saveToken(foundUser.id, newRefreshToken);
      
              res.set('access-token', newAccessToken);
              res.set('refresh-token', newRefreshToken);
            } catch (error) {
              console.error(error);
            }
          }
      
          console.log('middle ware');
      
          next();
    }
}