import './who-owes-who.styles.scss'

interface WhoOwesWhoProps {
  user: string
  owesTo: string
}

function WhoOwesWho({ user, owesTo }: WhoOwesWhoProps) {
  return (
    <div className='who-owes-container'>
      <div className='who-owes-who'>
        <span className='who-owes-user'>{user}</span>
        <span>owes</span>
        <span className='who-owes-to'>{owesTo}</span>
      </div>
      <div>150$</div>
    </div>
  )
}

export default WhoOwesWho
