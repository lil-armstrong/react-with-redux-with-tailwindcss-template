import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import CategoryReducer from './category.reducer'
import SessionReducer from './session.reducer'

const persistConfig = {
  key: 'root',
  // version: 1,
  storage,
  // whitelist: ["user", "setting", "media", "receipts"],
  blacklist: [],
}

const allReducers = {
  Category: CategoryReducer,
  Session: SessionReducer,
}

const appReducer = combineReducers(allReducers)

const persistedReducer = persistReducer(persistConfig, appReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        warnAfter: 150,
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          'Profile/wallet',
        ],
      },
      immutableCheck: {
        warnAfter: 150,
        // ignoredPaths: [
        //   FLUSH,
        //   REHYDRATE,
        //   PAUSE,
        //   PERSIST,
        //   PURGE,
        //   REGISTER,
        //   "Profile",
        //   "Session",
        //   "Chart",
        // ],
      },
    }) /* .concat(logger), */,
})
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appReducer>

// Inferred type: {user: UsersState, ...}
export type AppDispatch = typeof store.dispatch

export default appReducer
