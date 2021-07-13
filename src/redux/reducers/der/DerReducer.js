import * as constants from '../../constants';

export default function derReducer(state = [], action) {
    switch (action.type) {
        case constants.CREATE_DER:
            return { ...action.payload };
        case constants.GET_DER:
            return { ...action.payload };
        case constants.GET_ALL_DERS:
            return [...action.payload];
        case constants.UPDATE_DER:
            return { ...action.payload };
        case constants.DELETE_DER:
            return { ...action.payload };
        default:
            return state;
    }
}