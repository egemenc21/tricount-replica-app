import './header.styles.scss'
import { AiOutlineArrowLeft, AiOutlineSearch, AiFillBell } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link, Outlet, useParams } from 'react-router-dom'
import HeaderList, {
  TriCountRouteParams,
} from '../../components/header-list/HeaderList'
import { useAppDispatch, useAppSelector, useEachTriCount } from '../../hooks'
import { fetchTriCountsAsync } from '../../store/tricounts/tricounts.reducer'
import { selectCurrentUser } from '../../store/user/user.selector'

function Header() {
  const { tricount } = useParams<
    keyof TriCountRouteParams
  >() as TriCountRouteParams
  const eachTriCount = useEachTriCount(tricount)
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
          <div className="icon-container">
            <AiOutlineSearch size={25} />
            <AiFillBell size={25} />
            <BsThreeDotsVertical size={25} />
          </div>
        </div>
        <HeaderList />
      </header>
      <Outlet />
    </>
  )
}

export default Header
