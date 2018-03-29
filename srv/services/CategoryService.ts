import { Component } from '@nestjs/common';
import { Request, Response } from 'express';
import { CategoryModel } from '../common';
import { ResponseObject } from '../classes';
import { Category as CategoryInterface, Const } from '../../glob';

@Component()
export class CategoryService {
    constructor() {}

    async getCategories(req: Request, res: Response) {
        try {
            const categories = await CategoryModel.find({});
            return ResponseObject.makeSuccess(res, categories);
        } catch (e) {
            return ResponseObject.makeError(res, e);
        }
    }

    async addCategory(req: Request, res: Response) {
        const body = req.body;
        const newCategory: CategoryInterface = {
            _id: null,
            name: 'New Category',
            index: 0,
            path: []
        };
        const Category = new CategoryModel(newCategory);
        try {
            const allCategories = await CategoryModel.find({});
            const modCategories = allCategories.map((category) => {
                category.index += 1;
                category.path = category.path.map(path => path + 1);
                return category;
            });

            const categoryForUpdateList = [];
            modCategories.forEach((category) => {
                const update = CategoryModel.findByIdAndUpdate(category._id, category);
                categoryForUpdateList.push(update);
            });
            await Promise.all(categoryForUpdateList);

            await Category.save();

            const categories = await CategoryModel.find({});
            return ResponseObject.makeSuccess(res, categories);
        } catch (e) {
            return ResponseObject.makeError(res, e);
        }
    }

    async updateCategories(req: Request, res: Response) {
        const id = req.params.id;
        if (id === Const.NullString) {
            // Update all categories after sorting
            const bodyCategories = req.body;
            const categoryForUpdateList = [];
            bodyCategories.forEach((cat) => {
                const update = CategoryModel.findByIdAndUpdate(cat._id, {
                    name: cat.name,
                    path: cat.path,
                    index: cat.index
                });
                categoryForUpdateList.push(update);
            });
            Promise.all(categoryForUpdateList).then(async () => {
                const categories = await CategoryModel.find({});
                return ResponseObject.makeSuccess(res, categories);
            });
        } else {
            // Update single category after modifing
            await CategoryModel.findByIdAndUpdate(id, {
                name: req.body.name}
            );
            const categories = await CategoryModel.find({});
            return ResponseObject.makeSuccess(res, categories);
        }
    }

    async deleteCategory(req: Request, res: Response) {
        const id = req.params.id;
        const categoryForDelete = await CategoryModel.findById(id);
        const categoryForDeleteIndex = categoryForDelete.index;

        await CategoryModel.remove({_id: id});

        const nextCategories = await CategoryModel.find({index: {$gt: categoryForDeleteIndex}});

        const categoryForUpdateList = [];
        nextCategories.forEach((cat) => {
            const update = CategoryModel.findByIdAndUpdate(cat._id, {
                $inc: {index: -1}
            });
            categoryForUpdateList.push(update);
        });
        if (nextCategories.length > 0) {
            Promise.all(categoryForUpdateList).then(async () => {
                const categories = await CategoryModel.find({});
                return ResponseObject.makeSuccess(res, categories);
            });
        } else {
            const categories = await CategoryModel.find({});
            return ResponseObject.makeSuccess(res, categories);
        }
    }
}
