import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const enhancedReducer = persistReducer(persistConfig, reducers);

export default function configureStore() {
    const middlewares = [thunk];
    const enhancer = applyMiddleware(...middlewares);
    const store = createStore(enhancedReducer, enhancer);
    const persistor = persistStore(store);
    return { store, persistor };
};