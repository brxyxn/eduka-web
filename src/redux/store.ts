// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist"
import { counterSlice } from "@/redux/counter/counter-slice"
import storage from "@/redux/storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"

const persistConfig = {
  key: "root",
  storage,
}

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
// export const rootReducer = combineSlices(counterSlice, quotesApiSlice);
export const rootReducer = combineReducers({
  [counterSlice.reducerPath]: counterSlice.reducer,
  // [quotesApiSlice.reducerPath]: quotesApiSlice.reducer,
})
// Infer the `RootState` type from the root reducer

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // }).concat(quotesApiSlice.middleware), // what does it do?
})

export const persistor = persistStore(store)

// `makeStore` encapsulates the store configuration to allow
// creating unique store instances, which is particularly important for
// server-side rendering (SSR) scenarios. In SSR, separate store instances
// are needed for each request to prevent cross-request state pollution.
export const makeStore = () => {
  return store
}
