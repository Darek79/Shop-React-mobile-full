import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { basketReducer, basketActionReducer } from './reducers/basket';
import { jwtTokenReducer } from './reducers/jwtToken';
import { addSize } from './reducers/addSize';

const loggerMiddleware = createLogger();

const persistConfig = {
  key: 'b77a14f0-fd25-11ea-95f1-ff14921ff326',
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  basketReducer: basketReducer,
  basketActionReducer: basketActionReducer,
  tokenReducer: jwtTokenReducer,
  sizePicked: addSize,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = createStore(
//   rootReducer,
//   applyMiddleware(thunkMiddleware, loggerMiddleware)
// );

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
export const persistor = persistStore(store);
// export default () => {
//   let store = createStore(
//     persistedReducer,
//     applyMiddleware(thunkMiddleware, loggerMiddleware)
//   );
//   let persistor = persistStore(store);
//   return { store, persistor };
// };
