import { Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../layout/header/Header'
import Expenses from '../expenses/Expenses'
import Balances from '../balances/Balances'
import { useAppSelector } from '../../hooks'

import { selectGroupsMap } from '../../store/groups/groups.selector'

type GroupRouteParams = {
  group: string
}

function EachGroup() {
  const { group } = useParams<keyof GroupRouteParams>() as GroupRouteParams
  const groupsMap = useAppSelector(selectGroupsMap)
  const [eachGroup, setEachGroup] = useState(groupsMap[group])

  useEffect(() => {
    setEachGroup(groupsMap[group])
  }, [groupsMap, group])

  return (
    <>
      <Header currentPath={group} eachGroup={eachGroup} />
      <Routes>
        <Route index element={<Expenses expensesData={eachGroup.expenses} />} />
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
}

export default EachGroup
