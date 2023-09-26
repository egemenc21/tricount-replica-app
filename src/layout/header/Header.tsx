import './header.styles.scss'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link, Outlet, useParams } from 'react-router-dom'
import HeaderList, {
  TriCountRouteParams,
} from '../../components/header-list/HeaderList'
import { useAppDispatch, useAppSelector, useEachTriCount } from '../../hooks'
import { fetchTriCountsAsync } from '../../store/tricounts/tricounts.reducer'
import { selectCurrentUser } from '../../store/user/user.selector'

function Header() {
  const { tricountId } = useParams<
    keyof TriCountRouteParams
  >() as TriCountRouteParams
  const eachTriCount = useEachTriCount(tricountId)
  const { title, participators } = eachTriCount
  const user = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const handleOnClick = () => {
    if (user) dispatch(fetchTriCountsAsync(user.uid, 'tricounts'))
  }

  return (
    <>
      <header className="header">
        <div>
          <div className="header-information-tricount">
            <Link to="/home" onClick={handleOnClick}>
              <AiOutlineArrowLeft size={25} />
            </Link>
            <div className="header-information">
              <h1>{title}</h1>
              <p>
                {participators &&
                  participators.toString().replace(/,/g, ', ').trim()}
              </p>
            </div>
          </div>
        </div>
        <HeaderList />
      </header>
      <Outlet />
    </>
  )
}

export default Header
