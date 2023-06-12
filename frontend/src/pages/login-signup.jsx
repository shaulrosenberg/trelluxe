import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from '../cmps/img-uploader'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { ImTrello } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

import leftHero from '../assets/img/left-hero.svg'
import rightHero from '../assets/img/right-hero.svg'
import { login, signup } from '../store/user.actions'
import googleIcon from '../assets/img/google-login-icon-24-removebg-preview.png'

export function LoginSignup(props) {
   let navigate = useNavigate()

   const dispatch = useDispatch()
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [fullname, setFullname] = useState('')

   let location = useLocation()
   const isLoginMode = location.pathname.includes('login')
   async function handleSubmit(ev) {
      ev.preventDefault()
      if (username.trim() && password.trim()) {
         if (!isLoginMode) {
            signup({
               username,
               password,
               fullname,
               imgUrl: 'https://robohash.org/adam',
            })
            login({ username, password })
            navigate('/workspace')
         } else {
            login({ username, password })
            navigate('/workspace')
         }
      }
   }

   return (
      <section className='login-signup-container'>
         <div className='login-signup-header'>
            <ImTrello className='trello-logo' />
            <h1 className='logo'>Trelluxe</h1>
         </div>

         <div className='login-signup-body'>
            <div className='login-registration-modal'>
               <h1>
                  {isLoginMode ? 'Login to Trelluxe' : 'sign up for your account'}
               </h1>
               <form className='registration-form' onSubmit={handleSubmit}>
                  {!isLoginMode && (
                     <input
                        required
                        type='txt'
                        value={fullname}
                        onChange={(ev) => setFullname(ev.target.value)}
                        placeholder='Enter Full Name'
                     />
                  )}
                  <input
                     required
                     type='txt'
                     value={username}
                     onChange={(ev) => setUsername(ev.target.value)}
                     placeholder='Enter Username'
                  />
                  <input
                     required
                     type='password'
                     value={password}
                     onChange={(ev) => setPassword(ev.target.value)}
                     placeholder='Enter Password'
                     autoComplete='off'
                  />
                  <button
                     type='submit'
                     className={`submit-btn ${
                        isLoginMode ? 'login' : 'signup'
                     }`}
                  >
                     {isLoginMode ? 'Log in' : 'Sign up'}
                  </button>
                  <h3>OR</h3>
                  <button className='btn-google'>
                     <span>
                        <img src={googleIcon} />
                     </span>
                     Continue with Google
                  </button>
               </form>
            </div>
         </div>
         <div className='login-imgs'>
            <img src={leftHero} className='left-hero' />
            <img src={rightHero} className='right-hero' />
         </div>
      </section>
   )
}
