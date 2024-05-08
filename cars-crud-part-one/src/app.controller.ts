import { Controller, Get, Res, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }



  @Get("/academy")
  getAcademyName(@Res() res: Response, @Req() req: Request) {
    const academyName = this.appService.getAcademy()
    res.send(academyName)
  }
}


