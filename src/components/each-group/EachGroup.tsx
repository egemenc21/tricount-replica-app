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

type GroupRouteParams = {
  group: string
}

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
      <>
        <Header currentPath={group} eachGroup={eachGroup} />
        <Routes>
          <Route
            path="/"
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
        </Routes>
      </>
    )
  )
}

export default EachGroup
