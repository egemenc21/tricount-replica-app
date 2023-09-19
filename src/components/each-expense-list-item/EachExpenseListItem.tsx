import './each-expense-list-item.styles.scss'

interface EachExpenseListItemProps {
  participant: string
  share: number
  symbol: string
}

function EachExpenseListItem({
  participant,
  share,
  symbol,
}: EachExpenseListItemProps) {
  return (
    <li className="each-expense-list-item">
      <h2>{participant}</h2>
      <span dangerouslySetInnerHTML={{ __html: `${share}${symbol}` }} />
    </li>
  )
}

export default EachExpenseListItem
