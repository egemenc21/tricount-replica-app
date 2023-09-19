import './balances-list-item.styles.scss'

interface BalancesListItemProps {
  money: number
  user: string
  symbol: string
}

function BalancesListItem({ money, user, symbol }: BalancesListItemProps) {
  const isDebt = money < 0
  const sign = isDebt ? '-' : ''
  const positiveAmount = sign === '-' ? money * -1 : money * +1
  return (
    <li className="balances-list-container">
      <div
        className={`balances-money ${isDebt ? 'debt' : 'rich'}`}
        dangerouslySetInnerHTML={{
          __html: `${sign}${symbol}${positiveAmount.toFixed(1)}`,
        }}
      />
      <h3 className="balances-user">{user}</h3>
    </li>
  )
}

export default BalancesListItem
