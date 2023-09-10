import { nanoid } from 'nanoid'
import BalancesListItem from '../balances-list-item/BalancesListItem'
import WhoOwesWho, { OwesData } from '../who-owes-who/WhoOwesWho'
import './balances.styles.scss'
import calculateBalances, {
  BalancesProps,
} from '../../utils/balances/balances.utils'

function Balances({ participators, expenses }: BalancesProps) {
  const balances = calculateBalances({ participators, expenses })

  // Initialize an empty array to store owesData
  const owesData: OwesData[] = []

  // Iterate through balances
  Object.keys(balances).forEach((participantA) => {
    Object.keys(balances).forEach((participantB) => {
      const balanceA = balances[participantA]
      const balanceB = balances[participantB]

      // Check if participantA owes money to participantB
      if (balanceA < 0 && balanceB > 0) {
        const amount = Math.min(Math.abs(balanceA), balanceB)

        const id = nanoid()

        // Append the data to owesData
        owesData.push({
          id,
          debtor: participantA,
          creditor: participantB,
          amount,
        })
      }
    })
  })

  return (
    <>
      <ul className="balances-container">
        {Object.keys(balances).map((participant) => (
          <BalancesListItem
            key={participant}
            money={balances[participant]}
            user={participant}
          />
        ))}
      </ul>
      <div>HOW SHOULD I BALANCE ?</div>
      <WhoOwesWho owesData={owesData} />
    </>
  )
}

export default Balances
