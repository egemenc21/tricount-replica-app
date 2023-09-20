import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Expense } from '../tricounts/tricounts.types'

export interface ExpensesState {
  value: Expense[]
}

const initialState: ExpensesState = {
  value: [],
}

const addExpense = (expenses: Expense[], expenseToAdd: Expense) => {
  if (expenses) return [...expenses, expenseToAdd]
  return [expenseToAdd]
}
const removeExpense = (expenses: Expense[], expenseId: string) => {
  const existingExpense = expenses.find((expense) => expense.id === expenseId)
  if (existingExpense) {
    return expenses.filter((expense) => expense.id !== existingExpense.id)
  }
  return [...expenses]
}
const updateExpense = (expenses: Expense[], expenseToUpdate: Expense) => {
  const updatedExpenses = expenses.map((expense) =>
    expense.id === expenseToUpdate.id ? expenseToUpdate : expense
  )

  return updatedExpenses
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
    updateExpenseInExpenses: (state, action: PayloadAction<Expense>) => {
      return {
        ...state,
        value: updateExpense(state.value, action.payload),
      }
    },
  },
})

export const {
  setExpenses,
  addExpenseToExpenses,
  removeExpenseFromExpenses,
  updateExpenseInExpenses,
} = expensesSlice.actions

export default expensesSlice.reducer
