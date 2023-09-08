import BalancesListItem from '../balances-list-item/BalancesListItem'
import WhoOwesWho from '../who-owes-who/WhoOwesWho'
import './balances.styles.scss'

// interface BalancesProps {}

function Balances() {
  return (
    <>
      <ul className='balances-container'>
        <BalancesListItem money={150} />
        <BalancesListItem money={-150} />
      </ul> 
      <div>
        HOW SHOULD I BALANCE ?
      </div>
      <WhoOwesWho user='ege' owesTo='julie'/>
    </>
  )
}

export default Balances
