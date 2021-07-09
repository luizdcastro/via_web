import * as constants from '../../constants';

export default function tableReducer(state = [], action) {
    switch (action.type) {
        case constants.CREATE_TABLE:
            return { ...action.payload };
        case constants.GET_TABLE:
            return { ...action.payload };
        case constants.GET_ALL_TABLES:
            return [...action.payload];
        case constants.UPDATE_TABLE:
            return { ...action.payload };
        case constants.DELETE_TABLE:
            return { ...action.payload };
        default:
            return state;
    }
}