import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { darken } from 'polished'

// icons
import { FaInfoCircle } from 'react-icons/fa'
import { FaRocket } from 'react-icons/fa'
import { BsTrello } from 'react-icons/bs'

export function AppHeader() {
    const navDropdownRef = useRef()
    const navButtonsRef = useRef()
    const [isMenuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const user = useSelector((storeState) => storeState.userModule.user)
    const location = useLocation()

    const board = useSelector(storeState => storeState.boardModule.selectedBoard)

    // TODO: change color if style has backgroundImage
    function fetchBoardStyle() {
        if (board && board.style)
            return {
                backgroundColor: `${darken(0.2, board.style.backgroundColor)}`,
            }
        else return { backgroundColor: '#026AA7' }
    }

    function onTryDemo() {
        navigate('/workspace')
    }

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    }

    return location.pathname !== '/' ? (
        <header className='app-header-work' style={fetchBoardStyle()}>
            <nav className='main-nav-bar-work'>
                <div className='nav-dropdown-work'>
                    <div>
                        <Link to='/'>
                            <div className='div-workspace'>
                                <BsTrello className='logo-workspace' />

                                <h2 className='logo-work'>Trelluxe </h2>
                            </div>
                        </Link>
                    </div>

                    <NavLink className='nav-link-work' to='/workspace'>
                        {' '}
                        Workspace
                    </NavLink>

                    {/* <NavLink className='nav-link-work not-clickable'>Recent</NavLink>

               <NavLink className='nav-link-work not-clickable'>
                  Starred
               </NavLink>
               <NavLink className='nav-link-work not-clickable'>
                  Templates
               </NavLink> */}
                    {/* <button onClick={() => getPrompt()}>use Ai</button>
               <button onClick={() => getAiImage()}>use Ai image</button> */}
                </div>

                <div className='div-user'>
                    {/* <input
                  type='text'
                  placeholder='Search'
                  className='not-clickable'
               /> */}
                    <FaRocket className='icon-rocket not-clickable ' />
                    <FaInfoCircle className='icon-info not-clickable ' />
                    <div className='user-container'>{user && <img src={user.imgUrl} />}</div>
                </div>
            </nav>
        </header>
    ) : (
        <header className='app-header-homepage'>
            <nav className='main-nav-bar'>

                <div className={`menu ${isMenuOpen ? 'open' : ''}`}>


                    <div className='nav-dropdown' ref={navDropdownRef}>
                        <Link to='/' className='homepage-logo'>
                            <BsTrello className='logo-workspace' />
                            <h2 className='logo-work'>Trelluxe </h2>
                        </Link>

                        <NavLink to='/workspace' className='nav-link'>
                            Workspace
                        </NavLink>

                        <NavLink to='/workspace' className='nav-link'>
                            Boards
                        </NavLink>
                    </div>

                    <div className='nav-buttons' ref={navButtonsRef}>
                        <Link className='a-login' to={'/login'}>Log in</Link>
                        <button className='btn-demo' onClick={() => onTryDemo()}>Try Demo</button>
                    </div>
                </div>


                <div className='hamburger' onClick={toggleMenu}>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                </div>
            </nav>
        </header>

    )
}