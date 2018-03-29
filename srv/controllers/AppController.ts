import { Controller, Get, Post, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ServerApi } from '../../glob';
import { AppService } from '../services';

@Controller()
export class AppController {
    constructor(private appService: AppService) {}

    @Get(ServerApi.COUNTRIES)
    getCountries(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        this.appService.getCountries(req, res, next);
    }
}
