import './who-owes-who.styles.scss'

export interface OwesData {
  debtor: string
  creditor: string
  amount: number
}

interface WhoOwesWhoProps {
  owesData: OwesData[]
}

function WhoOwesWho({ owesData }: WhoOwesWhoProps) {
  return (
    <div>
      <h2>Who Owes Who</h2>
      <ul>
        {owesData.map((entry, index) => (
          <div key={index} className="who-owes-container">
            <div className="who-owes-who">
              <span className="who-owes-user">{entry.debtor}</span>
              <span>owes</span>
              <span className="who-owes-to">{entry.creditor}</span>
            </div>
            <div>{entry.amount}</div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default WhoOwesWho
