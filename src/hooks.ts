import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store/store'
import { selectEachGroup } from './store/groups/groups.selector';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useEachGroup = (groupParam: string) => {
    return useAppSelector((state) => selectEachGroup(state, groupParam));
  };