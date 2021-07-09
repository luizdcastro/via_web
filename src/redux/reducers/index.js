import { combineReducers } from 'redux';

import user from './user/UserReducer';
import table from './table/TableReducer'

const rootReducer = combineReducers({
    user,
    table
});

export default rootReducer;