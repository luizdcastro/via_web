import { combineReducers } from 'redux';

import user from './user/UserReducer';
import der from './der/DerReducer';
import sicro from './sicro/SicroReducer';
import budget from './budget/BudgetReducer'

const rootReducer = combineReducers({
    user,
    der,
    sicro,
    budget,
});

export default rootReducer;