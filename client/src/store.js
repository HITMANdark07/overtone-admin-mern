import { createStore , applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
const persistConfig = {
    key: 'root',
    storage,
  }
   
  const persistedReducer = persistReducer(persistConfig, rootReducer)

const initialState = {};

const middleware = [thunk];

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware),
        // window.__REDUX_DEVTOOLS_EXTENSION__() || compose
    )
 );

export default store;