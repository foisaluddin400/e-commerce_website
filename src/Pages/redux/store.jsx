import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from './api/baseApi';
import { authSlice } from './features/auth/authSlice';

// Define design slice
const designSlice = createSlice({
  name: 'design',
  initialState: {
    frontPreview: null,
    backPreview: null,
  },
  reducers: {
    saveDesigns: (state, action) => {
      state.frontPreview = action.payload.frontPreview;
      state.backPreview = action.payload.backPreview;
    },
  },
});

// Export design actions
export const { saveDesigns } = designSlice.actions;

const persistConfig = {
  key: 'quiz-app',
  storage,
  blacklist: ['baseApi'], // Prevent persisting API cache
};

const rootReducer = combineReducers({
  logInUser: authSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
  design: designSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(baseApi.middleware),
});

export const persistor = persistStore(store);




// import { configureStore } from '@reduxjs/toolkit'

// import { setupListeners } from '@reduxjs/toolkit/query'
// import { baseApi } from './api/baseApi'

// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath] :  baseApi.reducer
//   },
//   middleware : (getDefaultMiddleware)=>
//     getDefaultMiddleware().concat(baseApi.middleware)
// })
// setupListeners(store.dispatch)


