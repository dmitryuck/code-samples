import { Component } from '@nestjs/common';
import { CountryModel } from '../common';
import { ResponseObject } from '../classes';

@Component()
export class AppService {
    constructor() {}

    async getCountries(req, res, next) {
        const countries = await CountryModel.find({});
        return ResponseObject.makeSuccess(res, countries);
    }
}
