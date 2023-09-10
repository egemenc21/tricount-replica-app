import { Route, Routes, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Header from '../../layout/header/Header'
import Expenses from '../expenses/Expenses'
import Balances from '../balances/Balances'
import groupsData from '../../db/groupsData.json'
import { stringConverter } from '../../utils/format/format.utils'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setEachGroup } from '../../store/group/each-group.reducer'
import selectEachGroup from '../../store/group/ecah-group.selector'


type GroupRouteParams = {
  group: string
}

function EachGroup() {
  const dispatch = useAppDispatch()
  const { group } = useParams<keyof GroupRouteParams>() as GroupRouteParams

  useEffect(() => {
    groupsData.forEach((data) => {
      if (stringConverter(data.groupName) === group) {
        dispatch(setEachGroup(data))
      }
    })
  })
  
  const { value } = useAppSelector(selectEachGroup)


  return (
    <>
      <Header      
        currentPath={group}
      />
      <Routes>
        <Route
          path="expenses/*"
          element={<Expenses expensesData={value.expenses} />}
        />
        <Route
          path="balances"
          element={
            <Balances participators={value.participators} expenses={value.expenses} />
          }
        />
      </Routes>
    </>
  )
}

export default EachGroup
