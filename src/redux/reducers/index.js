import { combineReducers } from 'redux';

import user from './user/UserReducer';
import table from './table/TableReducer';
import budget from './budget/BudgetReducer'

const rootReducer = combineReducers({
    user,
    table,
    budget,
});

export default rootReducer;