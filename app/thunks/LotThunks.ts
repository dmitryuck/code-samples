import { getRequest, postRequest, uploadRequest, ServerApi } from '../../glob';

export class LotThunks {
    static getLots() {
        return (dispatch, getState) => {
            const state = getState().appState;

            return getRequest(ServerApi.LOTS);
        }
    }

    static addLot(lot) {
        return (dispatch, getState) => {
            const state = getState().appState;

            return uploadRequest(ServerApi.LOTS, lot);
        }
    }
}
