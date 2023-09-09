import BalancesListItem from '../balances-list-item/BalancesListItem'
import WhoOwesWho from '../who-owes-who/WhoOwesWho'
import './balances.styles.scss'
import calculateBalances, {
  BalancesProps,
} from '../../utils/balances/balances.utils'

function Balances({ participators, expenses }: BalancesProps) {
  const balances = calculateBalances({ participators, expenses })

  console.log(balances, participators)

  return (
    <>
      <ul className="balances-container">
        {Object.keys(balances).map((participant) => (
          <BalancesListItem key={participant}  money={balances[participant]} user={participant} />
        ))}
      </ul>
      <div>HOW SHOULD I BALANCE ?</div>
      <WhoOwesWho user="ege" owesTo="julie" />
    </>
  )
}

export default Balances
