import { Middleware, NestMiddleware } from '@nestjs/common';

@Middleware()
export class LoggingMiddleware implements NestMiddleware {
    resolve(): (req, res, next) => void {
        return (req, res, next) => {
            if (req.isAuthenticated()) {
                return next();
            }

            res.redirect('/login');
        }
    }
}
