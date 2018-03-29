import { join, dirname } from 'path';
import nconf from 'nconf';

const Config = {
    PORT: 5000,
    MONGODB_URL: 'mongodb://localhost:27017/auxdb',
    HOST_URL: 'http://localhost:5000'
}

export function initConfig() {
    nconf.use('memory');

    nconf.env();

    nconf.set('IS_PROD', process.env.PROD === 'true');
    nconf.set('ROOT_DIR', join(process.cwd(), 'dist'));
    // nconf.set('ENV_DIR', process.env.PROD === 'true' ? 'prod' : 'dev');

    nconf.defaults(Config);
}
