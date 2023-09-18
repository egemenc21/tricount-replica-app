import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TriCount } from './tricounts.types'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

export interface TriCountsState {
  value: TriCount[]
  isLoading: boolean
  error: Error | null
}

const initialState: TriCountsState = {
  value: [],
  isLoading: false,
  error: null,
}

const addTriCount = (triCounts: TriCount[], triCountToAdd: TriCount) => {
  return [...triCounts, triCountToAdd]
}
const removeTriCount = (triCounts: TriCount[], triCountId: string) => {
  return triCounts.filter((triCount) => triCount.id !== triCountId)
}

export const tricountsSlice = createSlice({
  name: 'tricounts',
  initialState,
  reducers: {
    fetchTriCountsStart: (state) => {
      return {
        ...state,
        isLoading: true,
      }
    },
    fetchTriCountsSuccess: (state, action: PayloadAction<TriCount[]>) => {
      return {
        ...state,
        value: action.payload,
        isLoading: false,
      }
    },
    fetchTriCountsFailed: (state, action: PayloadAction<Error>) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    },
    addTriCountToTriCounts: (state, action: PayloadAction<TriCount>) => {
      return {
        ...state,
        value: addTriCount(state.value, action.payload),
      }
    },
    removeTriCountFromTriCounts: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        value: removeTriCount(state.value, action.payload),
      }
    },
    emptyAllTriCounts:(state) => {
      return {
        ...state,
        value: [],
       
      }
    },
  },
})

export const {
  fetchTriCountsStart,
  fetchTriCountsSuccess,
  fetchTriCountsFailed,
  addTriCountToTriCounts,
  removeTriCountFromTriCounts,
  emptyAllTriCounts
} = tricountsSlice.actions

export const fetchTriCountsAsync =
  (userId: string, collectionKey: string) => async (dispatch: any) => {
    dispatch(fetchTriCountsStart())
    try {
      const triCountsArray = await getCategoriesAndDocuments(
        userId,
        collectionKey
      )
      dispatch(fetchTriCountsSuccess(triCountsArray))
    } catch (error) {
      dispatch(fetchTriCountsFailed(error as Error))
    }
  }

export default tricountsSlice.reducer
