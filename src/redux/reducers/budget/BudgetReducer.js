import * as constants from '../../constants';

export default function budgetReducer(state = [], action) {
    switch (action.type) {
        case constants.CREATE_BUDGET:
            return { ...action.payload };
        case constants.GET_BUDGET:
            return { ...action.payload };
        case constants.GET_ALL_BUDGETS:
            return [...action.payload];
        case constants.UPDATE_BUDGET:
            return { ...action.payload };
        case constants.DELETE_BUDGET:
            return { ...action.payload };
        default:
            return state;
    }
}