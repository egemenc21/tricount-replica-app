// type Props = {}
import { Route, Routes, useParams } from 'react-router-dom'
import Header from '../header/Header'
import Expenses from '../expenses/Expenses'
import Balances from '../balances/Balances'

function Group() {
  const { group } = useParams()
  console.log(group)

  return (
    <>
      <Header title="Opucuk" description="egemencelik,julie" />
      <Routes>
        <Route path="expenses/*" element={<Expenses />} />
        <Route path="balances" element={<Balances />} />
      </Routes>
    </>
  )
}

export default Group
