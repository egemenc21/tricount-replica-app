import { Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../layout/header/Header'
import Expenses from '../expenses/Expenses'
import Balances from '../balances/Balances'
import { useAppSelector } from '../../hooks'

import {
  selectGroupsIsLoading,
  selectGroupsMap,
} from '../../store/groups/groups.selector'
import { GroupRouteParams } from '../header-list/HeaderList'
import AddExpense from '../add-expense/AddExpense'

function EachGroup() {
  const { group } = useParams<keyof GroupRouteParams>() as GroupRouteParams
  const groupsMap = useAppSelector(selectGroupsMap)
  const isLoading = useAppSelector(selectGroupsIsLoading)
  const [eachGroup, setEachGroup] = useState(groupsMap[group])

  useEffect(() => {
    setEachGroup(groupsMap[group])
  }, [groupsMap, group])

  return isLoading ? (
    <p>LOADING</p>
  ) : (
    eachGroup && (
      <Routes>
        <Route
          path="/"
          element={<Header eachGroup={eachGroup} />}
        >
          <Route
            index
            element={<Expenses expensesData={eachGroup.expenses} />}
          />
          <Route
            path="balances"
            element={
              <Balances
                participators={eachGroup.participators}
                expenses={eachGroup.expenses}
              />
            }
          />
        </Route>

        <Route path="add-expense" element={<AddExpense/>} />
      </Routes>
    )
  )
}

export default EachGroup
