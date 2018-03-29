import { Dependencies, Controller, Get, Post, Res, Param, Body, Req, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ServerApi } from '../../glob';
import { PassportService } from '../services';

@Controller()
@Dependencies(PassportService)
export class AuthController {
    constructor(private passportService: PassportService) {}

    @Get(ServerApi.IS_LOGGED)
    isLogged(@Req() req: Request, @Res() res: Response) {
        this.passportService.isLogged(req, res);
    }

    @Post(ServerApi.LOCAL_LOGIN)
    localLogin(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        this.passportService.localLogin(req, res, next);
    }

    @Get(ServerApi.LOCAL_LOGOUT)
    localLogout(@Req() req: Request, @Res() res: Response) {
        req.logout();
        res.json({success: true, data: {redirect: 'login'}});
    }

    @Post(ServerApi.LOCAL_SIGNUP)
    localSignup(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        this.passportService.localSignup(req, res, next);
    }
}
