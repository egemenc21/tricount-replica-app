import './who-owes-who-item.styles.scss'

interface WhoOwesWhoItemProps {
  entry: { debtor: string; creditor: string; amount: number }
}

function WhoOwesWhoItem({ entry }: WhoOwesWhoItemProps) {
  const { debtor, creditor, amount } = entry
  return (
    <div className="who-owes-container">
      <div className="who-owes-who">
        <span className="who-owes-debtor">{debtor}</span>
        <span>owes</span>
        <span className="who-owes-creditor">{creditor}</span>
      </div>
      <div>{amount.toFixed(1)}</div>
    </div>
  )
}

export default WhoOwesWhoItem
