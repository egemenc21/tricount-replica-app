import { createSelector } from 'reselect'
import { RootState } from '../store'
import { ExpensesState } from './expenses.reducer'

export const selectExpensesReducer = (state: RootState): ExpensesState => {
  return state.expenses
}

export const selectExpenses = createSelector(
  [selectExpensesReducer],
  (expensesSlice) => expensesSlice.value
)
