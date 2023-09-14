import { Link, useLocation } from 'react-router-dom'
import './footer.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from '../../components/button/Button'

// interface FooterProps {

// }

function Footer() {
  const location = useLocation()
 
  
  return (
    <footer>
      <div>
        <h5>MY TOTAL</h5>
        <span>666</span>
      </div>
      <Link to={`${location.pathname}/add-expense`}className='add-expense'>
        <Button buttonType={BUTTON_TYPE_CLASSES.addExpense} className='add-expense'>+</Button>
      </Link>
      <div>
        <h5>TOTAL EXPENSES</h5>
        <span>666</span>
      </div>
    </footer>
  )
}

export default Footer
