import { createSelector } from 'reselect'
import { RootState } from '../store'
import { TriCountsState } from './tricounts.reducer'
import { TriCountMap } from './tricounts.types'

export const selectTriCountsReducer = (state: RootState): TriCountsState => {
  return state.tricounts
}

export const selectTriCounts = createSelector(
  [selectTriCountsReducer],
  (tricountsSlice) => tricountsSlice.value
)

export const selectTriCountsMap = createSelector(
  [selectTriCountsReducer],
  (tricounts): TriCountMap =>
    tricounts.value.reduce((acc, tricount) => {
      const { id, title, description, participators, expenses,currency, currencyData } = tricount      
      acc[id] = { id, title, description, participators, expenses,currency,currencyData}
      return acc
    }, {} as TriCountMap)
)

export const selectEachTriCount = createSelector(
  [selectTriCountsMap, (_state: RootState, tricountParam: string) => tricountParam],
  (tricountsMap, tricountParam) => {
    
    return  tricountsMap[tricountParam]
  }
)


export const selectTriCountsIsLoading = createSelector(
  [selectTriCountsReducer],
  (tricountsSlice) => tricountsSlice.isLoading
)
