import { createSelector } from 'reselect'
import { RootState } from '../store'
import { GroupsState } from './groups.reducer'
import { GroupMap } from './groups.types'
import { stringConverter } from '../../utils/format/format.utils'

export const selectGroupsReducer = (state: RootState): GroupsState => {
  return state.groups
}

export const selectGroups = createSelector(
  [selectGroupsReducer],
  (groupsSlice) => groupsSlice.value
)

export const selectGroupsMap = createSelector(
  [selectGroupsReducer],
  (groups): GroupMap =>
    groups.value.reduce((acc, group) => {
      const { id, title, description, participators, expenses } = group
      const convertedTitle = stringConverter(title)
      acc[convertedTitle] = { id, title, description, participators, expenses }
      return acc
    }, {} as GroupMap)
)
export const selectGroupsIsLoading = createSelector(
  [selectGroupsReducer],
  (groupsSlice) => groupsSlice.isLoading
)
