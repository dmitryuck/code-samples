import { getRequest, postRequest, putRequest, deleteRequest, ServerApi, Category } from '../../glob';

export class CategoryThunks {
    static getCategories() {
        return (dispatch, getState) => {
            const state = getState().categoryState;

            if (state.categories) {
                // return Promise.resolve();
            }

            return getRequest(ServerApi.CATEGORIES);
        }
    }

    static addCategory() {
        return (dispatch, getState) => {
            return postRequest(ServerApi.CATEGORIES, {});
        }
    }

    static saveCategories(categories: Category[]) {
        return (dispatch, getState) => {
            return putRequest(ServerApi.CATEGORIES, null, categories)
        }
    }

    static deleteCategory(id) {
        return (dispatch, getState) => {
            return deleteRequest(ServerApi.CATEGORIES, id);
        }
    }

    static updateCategory(id, data) {
        return (dispatch, getState) => {
            return putRequest(ServerApi.CATEGORIES, id, data);
        }
    }
}
