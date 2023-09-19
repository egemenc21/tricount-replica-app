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
export const selectExpenseById = (expenseId: string) =>
  createSelector([selectExpenses], (expenses) => {
    if (expenses) {
      return expenses.find((expense) => expense.id === expenseId) || null
    }
    return null
  })
export const selectTotalExpenses = createSelector(
  [selectExpenses],
  (expenses) => {
    if (expenses) {
      return expenses.reduce((total, expense) => total + expense.price, 0)
    }
    return 0
  }
)
export const selectTotalExpensesUsers = createSelector(
  [selectExpenses],
  (expenses) => {
    if (expenses) {
      const totals: Record<string, number> = {} // Store the totals for each user

      expenses.forEach((expense) => {
        const { id, price, forWhom, paidBy } = expense
        const numberOfPeople = forWhom.length
        const amountPerPerson = price / numberOfPeople

        forWhom.forEach((userId) => {
          if (!totals[userId]) {
            totals[userId] = 0
          }

          if (userId === paidBy) {
            // If the user paid for themselves, add their share to "my total"
            totals[userId] += amountPerPerson
          } else {
            // If the user paid for someone else, add their share to "users total"
            totals[userId] += amountPerPerson
          }
        })
      })

      return totals
    }
    return null
  }
)
