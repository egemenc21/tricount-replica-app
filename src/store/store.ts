import { Middleware, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import expensesReducer from './expenses/expenses.reducer'
import tricountsReducer from './tricounts/tricounts.reducer'
import { userReducer } from './user/user.reducer'

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  (middleware): middleware is Middleware => Boolean(middleware)
)

const store = configureStore({
  reducer: {
    tricounts: tricountsReducer,
    user: userReducer,
    expenses: expensesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(middleWares),
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
