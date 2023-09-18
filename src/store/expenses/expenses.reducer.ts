import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Expense } from '../tricounts/tricounts.types'

export interface ExpensesState {
  value: Expense[]
}

const initialState: ExpensesState = {
  value: [],
}

const addExpense = (expenses: Expense[], expenseToAdd: Expense) => {
  return [...expenses, expenseToAdd]
}
const removeExpense = (expenses: Expense[], expenseId: string) => {
  const existingExpense = expenses.find((expense) => expense.id === expenseId)
  if (existingExpense) {
    return expenses.filter((expense) => expense.id !== existingExpense.id)
  }
  return [...expenses]
}

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      return {
        ...state,
        value: action.payload,
      }
    },
    addExpenseToExpenses: (state, action: PayloadAction<Expense>) => {
      return {
        ...state,
        value: addExpense(state.value, action.payload),
      }
    },
    removeExpenseFromExpenses: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        value: removeExpense(state.value, action.payload),
      }
    },
  },
})

export const { setExpenses, addExpenseToExpenses, removeExpenseFromExpenses } =
  expensesSlice.actions

export default expensesSlice.reducer
