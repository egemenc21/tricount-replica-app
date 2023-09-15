import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Group } from './groups.types'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

export interface GroupsState {
  value: Group[]
  isLoading: boolean
  error: Error | null
}

const initialState: GroupsState = {
  value: [],
  isLoading: false,
  error: null,
}

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    fetchGroupsStart: (state) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    fetchGroupsSuccess: (state, action: PayloadAction<Group[]>) => {
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      }
    },
    fetchGroupsFailed: (state, action: PayloadAction<Error>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    },
  },
})

export const { fetchGroupsStart, fetchGroupsSuccess, fetchGroupsFailed } =
  groupsSlice.actions

export const fetchGroupsAsync = (userId: string) => async (dispatch: any) => {
  dispatch(fetchGroupsStart())
  try {
    const groupsArray = await getCategoriesAndDocuments(userId)
    dispatch(fetchGroupsSuccess(groupsArray))    
  } catch (error) {
    dispatch(fetchGroupsFailed(error as Error))
  }
}

export default groupsSlice.reducer
