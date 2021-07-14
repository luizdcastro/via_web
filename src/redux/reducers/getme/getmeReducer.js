import * as constants from '../../constants';

export default function getmeReducer(state = [], action) {
    switch (action.type) {
        case constants.GET_ME:
            return { ...action.payload };
        case constants.UPDATE_ME:
            return { ...action.payload };
        default:
            return state;
    }
}