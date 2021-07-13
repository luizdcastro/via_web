import * as constants from '../../constants';

export default function sicroReducer(state = [], action) {
    switch (action.type) {
        case constants.CREATE_SICRO:
            return { ...action.payload };
        case constants.GET_SICRO:
            return { ...action.payload };
        case constants.GET_ALL_SICROS:
            return [...action.payload];
        case constants.UPDATE_SICRO:
            return { ...action.payload };
        case constants.DELETE_SICRO:
            return { ...action.payload };
        default:
            return state;
    }
}