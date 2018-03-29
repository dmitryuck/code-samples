import { Controller, Get, Post, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ServerApi } from '../../glob';
import { LotService } from '../services';

@Controller()
export class LotController {
    constructor(private lotService: LotService) {}

    @Get(ServerApi.LOTS)
    getLots(@Req() req: Request, @Res() res: Response) {
        this.lotService.getLots(req, res);
    }

    @Post(ServerApi.LOTS)
    addLot(@Req() req: Request, @Res() res: Response) {
        this.lotService.addLot(req, res);
    }
}
