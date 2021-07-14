import { combineReducers } from 'redux';

import user from './user/UserReducer';
import der from './der/DerReducer';
import sicro from './sicro/SicroReducer';
import budget from './budget/BudgetReducer'
import getme from './getme/getmeReducer'

const rootReducer = combineReducers({
    user,
    getme,
    der,
    sicro,
    budget,
});

export default rootReducer;