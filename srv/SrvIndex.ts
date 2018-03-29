import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import reload from 'reload';
import fs from 'fs';
import nconf from 'nconf';
import multer from 'multer';
import { NestFactory } from '@nestjs/core';
import { ServerModule } from './ServerModule';
import { initConfig } from './Config';
import { dbConnect } from './Database';

initConfig();

const instance = express();
const MongoStore = connectMongo(session);

const corsOptions = {
    origin: nconf.get('HOST_URL'),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
};

instance.use(cors(corsOptions));
instance.use(bodyParser.json({
    limit: '2mb'
}));
instance.use(bodyParser.urlencoded({
    limit: '2mb',
    extended: true,
    parameterLimit: 2000
}));
instance.use(cookieParser());
instance.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    proxi: true,
    store: new MongoStore({url: nconf.get('MONGODB_URL')})
}));
instance.use(passport.initialize());
instance.use(passport.session());

// instance.set('view engine', 'html');
instance.set('nconf', nconf);

if (!nconf.get('IS_PROD')) {
    reload(instance);
}

async function bootstrap() {
    const app = await NestFactory.create(ServerModule, instance);

    await app.listen(nconf.get('PORT'));

    dbConnect(nconf.get('MONGODB_URL'));

    console.log('Server running successfully');
}

bootstrap();
