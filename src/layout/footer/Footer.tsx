import { Link } from 'react-router-dom'
import './footer.styles.scss'

// interface FooterProps {

// }

function Footer() {
  return (
    <footer>
      <div>
        <h5>MY TOTAL</h5>
        <span>666</span>
      </div>
      <Link to="/">
        <button type="button" className="btn add-expense">
          +
        </button>
      </Link>
      <div>
        <h5>TOTAL EXPENSES</h5>
        <span>666</span>
      </div>
    </footer>
  )
}

export default Footer
