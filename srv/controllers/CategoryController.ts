import { Controller, Dependencies, Get, Post, Put, Delete, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ServerApi, buildRouteUrl } from '../../glob';
import { CategoryService } from '../services';

@Controller()
@Dependencies(CategoryService)
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Get(ServerApi.CATEGORIES)
    getCategories(@Req() req: Request, @Res() res: Response) {
        this.categoryService.getCategories(req, res);
    }

    @Post(ServerApi.CATEGORIES)
    addCategory(@Req() req: Request, @Res() res: Response) {
        this.categoryService.addCategory(req, res);
    }

    @Put(buildRouteUrl(ServerApi.CATEGORIES, 'id'))
    updateCategories(@Req() req: Request, @Res() res: Response) {
        this.categoryService.updateCategories(req, res);
    }

    @Delete(buildRouteUrl(ServerApi.CATEGORIES, 'id'))
    deleteCategory(@Req() req: Request, @Res() res: Response) {
        this.categoryService.deleteCategory(req, res);
    }
}
