import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { apiMiddleware } from '../services/api-middleware';

import rootReducer from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['password']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
    persistedReducer,
    compose(applyMiddleware(apiMiddleware))
);

const persistor = persistStore(store);

export { persistor, store };