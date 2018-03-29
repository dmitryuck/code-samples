import multer from 'multer';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { ResponseObject } from '../classes';

@Middleware()
export class UploadingMiddleware implements NestMiddleware {
    resolve(): (req, res, next) => void {
        return (req, res, next) => {
            const upload = multer({
                dest: 'uploads/',
                rename: function (fieldname, filename) {
                    return  filename + Date.now();
                },
                limits: {
                    fileSize: 2000000
                }
            }).single('myImage');
            upload(req, res, (err) => {
                ResponseObject.makeSuccess(res, req.files);
                // return next();
            });
        }
    }
}
