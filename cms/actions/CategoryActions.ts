import { Category } from '../../glob';

export class CategoryActions {
    static SET_CATEGORIES = 'SET_CATEGORIES';

    static setCategories = (categories: Category[]) => ({ type: CategoryActions.SET_CATEGORIES, payload: categories });
}
