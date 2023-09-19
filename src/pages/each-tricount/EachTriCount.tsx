import { Route, Routes, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Vortex } from 'react-loader-spinner'
import Header from '../../layout/header/Header'
import Expenses from '../../components/expenses/Expenses'
import Balances from '../balances/Balances'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
  selectTriCountsIsLoading,
  selectTriCountsMap,
} from '../../store/tricounts/tricounts.selector'
import { TriCountRouteParams } from '../../components/header-list/HeaderList'
import AddExpense from '../add-expense/AddExpense'
import { setExpenses } from '../../store/expenses/expenses.reducer'
import EachExpense from '../each-expense/EachExpense'
import ModifyExpense from '../modify/Modify'

function EachTriCount() {
  const dispatch = useAppDispatch()
  const { tricount } = useParams<
    keyof TriCountRouteParams
  >() as TriCountRouteParams
  const tricountsMap = useAppSelector(selectTriCountsMap)
  const isLoading = useAppSelector(selectTriCountsIsLoading)
  const [eachTriCount, setEachTriCount] = useState(tricountsMap[tricount])

  useEffect(() => {
    setEachTriCount(tricountsMap[tricount])
    if (eachTriCount) {
      const { expenses } = eachTriCount
      dispatch(setExpenses(expenses))
    }
  }, [tricountsMap, tricount, eachTriCount, dispatch])

  return isLoading ? (
    <Vortex
      visible
      height="80"
      width="80"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  ) : (
    eachTriCount && (
      <Routes>
        <Route path="/" element={<Header />}>
          <Route
            index
            element={<Expenses currencyData={eachTriCount.currencyData} />}
          />
          <Route
            path="balances"
            element={
              <Balances
                participators={eachTriCount.participators}
                currencyData={eachTriCount.currencyData}
              />
            }
          />
        </Route>
        <Route
          path=":expenseId"
          element={<EachExpense currencyData={eachTriCount.currencyData} />}
        />
        <Route path=":expenseId/modify" element={<ModifyExpense/>} />
        <Route path="add-expense" element={<AddExpense />} />
      </Routes>
    )
  )
}

export default EachTriCount
