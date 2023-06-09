import { Link, NavLink, useLocation, Route, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from '../pages/login-signup.jsx'

import { boardService } from '../services/board.service'
import { useEffect, useState } from 'react'
import { darken } from 'polished'

//img
// import TrelloIconWork from '../assets/img/trello-icon-work-removebg-preview.png'
import TrelloIconWork from '../assets/img/trello-ic.png'

// icons
import { MdDarkMode } from 'react-icons/md'
import { WiMoonAltWaningCrescent4 } from 'react-icons/wi'
import { FaAdjust } from "react-icons/fa";
import { FaInfoCircle } from 'react-icons/fa'
import { FaRocket } from 'react-icons/fa'
import { BsTrello } from 'react-icons/bs'

export function AppHeader() {
     const user = useSelector((storeState) => storeState.userModule.user)
     const location = useLocation()
     const demoUser = boardService.demoUser()

     const [navColor, setNavColor] = useState(null)
     const boardId = location.pathname.split('/board/')[1]

     useEffect(() => {
          fetchBoardStyle()
     }, [location])

     function fetchBoardStyle() {
          if (boardId) {
               boardService
                    .getById(boardId)
                    .then((board) => {
                         let boardStyleColor = board.style.backgroundColor
                         if (!boardStyleColor) return
                         boardStyleColor = darken(0.2, boardStyleColor)

                         setNavColor(boardStyleColor)
                    })
                    .catch((err) =>
                         console.log('failed to change nav color', err)
                    )
          } else {
               setNavColor('#026AA7')
          }
     }

     async function onLogin(credentials) {
          try {
               const user = await login(credentials)
               showSuccessMsg(`Welcome: ${user.fullname}`)
          } catch (err) {
               showErrorMsg('Cannot login')
          }
     }
     async function onSignup(credentials) {
          try {
               const user = await signup(credentials)
               showSuccessMsg(`Welcome new user: ${user.fullname}`)
          } catch (err) {
               showErrorMsg('Cannot signup')
          }
     }
     async function onLogout() {
          try {
               await logout()
               showSuccessMsg(`Bye now`)
          } catch (err) {
               showErrorMsg('Cannot logout')
          }
     }

     return location.pathname !== '/' ? (
          <header
               className='app-header-work'
               style={{ backgroundColor: navColor }}
          >
               <nav className='main-nav-bar-work'>
                    <div className='nav-dropdown-work'>
                         <div>
                              <Link to='/'>
                                   <div className='div-workspace'>
                                        <BsTrello className='logo-workspace' />

                                        <h2 className='logo-work'>Trelux </h2>
                                   </div>
                              </Link>
                         </div>

                         <NavLink className='nav-link-work' to='/workspace'>
                              {' '}
                              Workspace
                         </NavLink>

                         <NavLink className='nav-link-work' to='/recent'>
                              Recent
                         </NavLink>

                         <NavLink className='nav-link-work' to='/starred'>
                              Starred
                         </NavLink>
                         <NavLink className='nav-link-work' to='/templates'>
                              Templates
                         </NavLink>
                    </div>

                    <div className='div-user'>
                         <input type='text' placeholder='Search' />
                         <FaRocket className='icon-rocket hover' />
                         <FaInfoCircle className='icon-info hover' />
                         <FaAdjust className='dark-theme hover' />
                         <div>{!user && <h2>{demoUser}</h2>}</div>
                    </div>
               </nav>
          </header>
     ) : (
          <header className='app-header-homepage'>
               <nav className='main-nav-bar'>
                    <div className='nav-dropdown'>
                         <Link to='/' className='homepage-logo'>
                              <BsTrello className='logo-workspace' />
                              <h2 className='logo-work'>Trelux </h2>
                         </Link>

                         <NavLink to='/workspace' className='nav-link'>
                              Workspace
                         </NavLink>

                         <NavLink to='/board' className='nav-link'>
                              Boards
                         </NavLink>
                    </div>

                    <div className='nav-buttons'>
                         <a className='a-login'>Log in</a>
                         <button className='btn-demo'>Try Demo</button>
                    </div>
               </nav>
          </header>
     )
}

// was inside the nav
{
     /* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */

     {
          /* {user && (
                         <span className='user-info'>
                              <Link to={`user/${user._id}`}>
                                   {user.imgUrl && <img src={user.imgUrl} />}
                                   {user.fullname}
                              </Link>
                              <span className='score'>
                                   {user.score?.toLocaleString()}
                              </span>
                              <button onClick={onLogout}>Logout</button>
                         </span>
                    )}
                    {!user && (
                         <section className='user-info'>
                              <LoginSignup
                                   onLogin={onLogin}
                                   onSignup={onSignup}
                              />
                         </section>
                    )}  */
     }
}
