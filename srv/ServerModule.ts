import { Module, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { ServerApi } from '../glob';
import {
    AppController,
    AuthController,
    UserController,
    CategoryController,
    LotController,
    StaticController
} from './controllers';
import {
    PassportService,
    UserService,
    AppService,
    CategoryService,
    LotService
} from './services';
import {
    LoggingMiddleware,
    UploadingMiddleware
} from './middlewares';

@Module({
    controllers: [
        AppController,
        AuthController,
        UserController,
        CategoryController,
        LotController,


        // Insert Controllers above
        StaticController
    ],
    components: [
        PassportService,
        UserService,
        AppService,
        CategoryService,
        LotService
    ]
})
export class ServerModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes(UserController);
        consumer.apply(UploadingMiddleware).forRoutes({ path: ServerApi.LOTS, method: RequestMethod.POST });
    }
}
