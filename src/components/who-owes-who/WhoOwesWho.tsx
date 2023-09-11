import WhoOwesWhoItem from '../who-owes-who-item/WhoOwesWhoItem'
import './who-owes-who.styles.scss'

export interface OwesData {
  id:string
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
        {owesData.map((entry) => (
          <WhoOwesWhoItem key={entry.id} entry={entry}/>
        ))}
      </ul>
    </div>
  )
}

export default WhoOwesWho
