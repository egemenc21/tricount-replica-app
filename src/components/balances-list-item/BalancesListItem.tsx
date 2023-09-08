import './balances-list-item.styles.scss'

interface BalancesListItemProps {
  money: number
}

function BalancesListItem({ money }: BalancesListItemProps) {
  console.log(money)
  const isDebt = money < 0

  return (
    <li className="balances-list-container">
      <div className={`balances-money ${isDebt ? 'debt' : 'rich'}`}>
        {' '}
        {money * +1}$
      </div>
      <h3 className="balances-user">user</h3>
    </li>
  )
}

export default BalancesListItem
