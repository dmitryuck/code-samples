import { Controller, Get, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { join, dirname } from 'path';
import { Config } from '../../glob';

import nconf = require('nconf');

import { appServerRender } from '../../app/AppServerRender';
import { cmsServerRender } from '../../cms/CmsServerRender';

@Controller()
export class StaticController {
    @Get('*.*')
    staticFiles(@Req() req, @Res() res) {
        res.sendFile(join(nconf.get('ROOT_DIR'), req.url));
    }

    @Get(Config.cmsRoot + '*')
    cmsIndexFile(@Req() req, @Res() res) {
        res.send(cmsServerRender(req.url));
    }

    @Get('*')
    appIndexFile(@Req() req, @Res() res) {
        res.send(appServerRender(req.url));
    }
}
