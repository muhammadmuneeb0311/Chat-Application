// src/redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  user: userReducer,
  message: messageReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: [], // add slices you don't want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ⚠ Ignore redux-persist actions to remove warning
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
