import { Category } from '../../glob';

export interface CmsRootState {
    router: any;
    cmsState: CmsState;
    categoryState: CategoryState;
}

export interface CmsState {
    config: any;
    isBrowser: boolean;
    user: any;
    location: any;
    countries: any[];
}

export interface CategoryState {
    categories: Category[];
}
