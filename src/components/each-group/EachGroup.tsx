import { Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../layout/header/Header'
import Expenses from '../expenses/Expenses'
import Balances from '../balances/Balances'
import { useAppDispatch, useAppSelector } from '../../hooks'

import {
  selectGroupsIsLoading,
  selectGroupsMap,
} from '../../store/groups/groups.selector'
import { GroupRouteParams } from '../header-list/HeaderList'
import AddExpense from '../add-expense/AddExpense'
import { setExpenses } from '../../store/expenses/expenses.reducer'

function EachGroup() {
  const dispatch = useAppDispatch()
  const { group } = useParams<keyof GroupRouteParams>() as GroupRouteParams
  const groupsMap = useAppSelector(selectGroupsMap)
  const isLoading = useAppSelector(selectGroupsIsLoading)
  const [eachGroup, setEachGroup] = useState(groupsMap[group])


  useEffect(() => {
    setEachGroup(groupsMap[group])
    if (eachGroup) {
      const { expenses } = eachGroup
      dispatch(setExpenses(expenses))
    }
  }, [groupsMap, group, eachGroup, dispatch])

  return isLoading ? (
    <p>LOADING</p>
  ) : (
    eachGroup && (
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Expenses />} />
          <Route path="balances" element={<Balances />} />
        </Route>
        <Route path="add-expense" element={<AddExpense />} />
      </Routes>
    )
  )
}

export default EachGroup
