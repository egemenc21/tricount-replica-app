import { Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from '../../layout/header/Header'
import Expenses, { ExpensesDataParams } from '../expenses/Expenses'
import Balances from '../balances/Balances'
import groupsData from '../../db/groupsData.json'
import { stringConverter } from '../../utils/string/string.utils'

interface Expense {
  id: number
  title: string
  price: number
  date: string
  paidBy: string
  forWhom: string[]
}

interface GroupData {
  id: number
  groupName: string
  description: string
  participators: string[]
  expenses?: Expense[]
}

type GroupRouteParams = {
  group: string
}

function Group() {
  const [groupData, setGroupData] = useState<GroupData>([])
  const { group } = useParams<keyof GroupRouteParams>() as GroupRouteParams
  const { participators, expenses } = groupData
 
  useEffect(() => {
    groupsData.forEach((data) => {
      if (stringConverter(data.groupName) === group) {
        setGroupData(data)
      }
    })
  })

  return (
    <>
      <Header participators={participators} groupName={group} />
      <Routes>
        <Route
          path="expenses/*"
          element={<Expenses expensesData={expenses} />}
        />
        <Route
          path="balances"
          element={
            <Balances participators={participators} expenses={expenses} />
          }
        />
      </Routes>
    </>
  )
}

export default Group
