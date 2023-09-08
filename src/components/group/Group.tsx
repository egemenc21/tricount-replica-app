// type Props = {}
import { Route, Routes, useParams } from 'react-router-dom'
import Header from '../header/Header'
import Expenses from '../expenses/Expenses'
import Balances from '../balances/Balances'

type GroupRouteParams = {
  group: string
}
interface GroupParams {
  title: string
  participators: string
}
function Group({ title = 'Opucuk', participators = 'ege, julie' }: GroupParams) {
  const { group } = useParams<keyof GroupRouteParams>() as GroupRouteParams
  console.log(group)

  return (
    <>
      <Header title={title} participators={participators} groupName={group} />
      <Routes>
        <Route path="expenses/*" element={<Expenses />} />
        <Route path="balances" element={<Balances />} />
      </Routes>
    </>
  )
}

export default Group
