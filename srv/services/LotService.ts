import { Component } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LotModel } from '../common';
import { ResponseObject } from '../classes';
import { Lot as LotInterface, Const, LotStatus } from '../../glob';

@Component()
export class LotService {
    constructor() {}

    async getLots(req: Request, res: Response) {
    }

    async addLot(req: Request, res: Response) {
        const body = req.body;
        const newLot: LotInterface = {
            _id: null,
            userId: body.userId,
            price: body.price,
            photosIds: body.photosIds,
            link: body.link,
            status: LotStatus.NEW,
            caption: body.caption,
            description: body.description,
            categoryId: body.categoryId
        }
        const Lot = new LotModel(newLot);
        try {
            const lot = await Lot.save();
            return ResponseObject.makeSuccess(res, lot);
        } catch (e) {
            return ResponseObject.makeError(res, e);
        }
    }

    async updateLot(req: Request, res: Response) {
        const id = req.params.id;
        if (id !== Const.NullString) {
        }
    }

    async deleteLot(req: Request, res: Response) {
        const id = req.params.id;
    }
}
