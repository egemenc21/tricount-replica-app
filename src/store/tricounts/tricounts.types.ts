export interface CurrencyData {
  abbreviation: string
  symbol: string
}

export interface Expense {
  id: string
  title: string
  price: number
  date: string
  paidBy: string
  forWhom: string[]
}

export interface TriCount {
  id: string
  title: string
  currency: string
  currencyData: CurrencyData
  description: string
  participators: string[]
  expenses: Expense[]
}
export interface TriCountMap {
  [key: string]: TriCount
}
