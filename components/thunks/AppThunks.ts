import { getRequest, ServerApi } from '../common';

export class AppThunks {
    static getFiles() {
        return (dispatch, getState) => {
            const state = getState().appState;

            if (state.counties) {
                // return Promise.resolve();
            }

            return getRequest(ServerApi.FILES);
        };
    }
}
