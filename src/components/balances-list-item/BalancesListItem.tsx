import './balances-list-item.styles.scss'

interface BalancesListItemProps {
  money: number
  user:string
}

function BalancesListItem({ money, user }: BalancesListItemProps) {
  const isDebt = money < 0
  const positiveAmount = money * +1

  return (
    <li className="balances-list-container">
      <div className={`balances-money ${isDebt ? 'debt' : 'rich'}`}>
        {positiveAmount.toFixed(1)}$
      </div>
      <h3 className="balances-user">{user}</h3>
    </li>
  )
}

export default BalancesListItem
